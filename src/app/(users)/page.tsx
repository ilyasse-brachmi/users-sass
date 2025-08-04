import { getUsers } from "@/features/users/api";
import UsersDataGrid from "@/features/users/components/UsersDataGrid";
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
      <div className="container mx-auto flex items-center justify-center w-screen h-screen">
        <UsersDataGrid />
      </div>
    </HydrationBoundary>
  );
}
