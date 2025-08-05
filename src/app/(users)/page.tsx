import BreadCrumbsComponent from "@/components/BreadCrumbsComponent";
import { getUsers } from "@/features/users/api";
import UsersClient from "@/features/users/components/UsersClient";
import UsersHeader from "@/features/users/components/UsersHeader";
import { getQueryClient } from "@/services/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Users() {
  const queryClient = getQueryClient();

  // Prefetch the first page with default pagination
  await queryClient.prefetchQuery({
    queryKey: ['users', 1, 6], // page 1, 6 items per page
    queryFn: () => getUsers(1, 6)
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-2 container mx-auto flex flex-col gap-2 items-start justify-start w-screen h-screen">
        <div className="mt-4 ms-2">
          <BreadCrumbsComponent />
        </div>
        <UsersHeader />
        <UsersClient />
      </div>
    </HydrationBoundary>
  );
}