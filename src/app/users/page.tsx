import BreadCrumbsComponent from "@/components/BreadCrumbsComponent";
import { getUsers } from "@/features/users/api";
import UsersDataGrid from "@/features/users/components/UsersDataGrid";
import UsersHeader from "@/features/users/components/UsersHeader";
import { getQueryClient } from "@/services/get-query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";

export default async function Users() {

  const queryClient = getQueryClient()

  await queryClient.prefetchQuery({
    queryKey: ['users'],
    queryFn: getUsers
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-2 container mx-auto flex flex-col gap-2 items-start justify-start w-screen h-screen">
        <div className="mt-4">
          <BreadCrumbsComponent />
        </div>
        <UsersHeader />

        <UsersDataGrid />
      </div>
    </HydrationBoundary>
  );
}
