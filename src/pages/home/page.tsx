import { Avatar } from "@/components/avatar";
import { Hello } from "@/components/hello-world";
import { Loading } from "@/components/loading";
import { useUsers } from "@/contexts/user-context";
import { API_URL } from "@/lib/utils";
import { QueryClient, queryOptions } from "@tanstack/react-query";
import axios from "axios";
import { Link, useNavigation } from "react-router";

export const usersQuery = () =>
  queryOptions({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/users`);
      if (!response) {
        throw new Error("Failed to fetch users");
      }
      return response.data;
    },
  });

export const usersLoader = (queryClient: QueryClient) => async () => {
  await queryClient.ensureQueryData(usersQuery());
};

export function Home() {
  const { state } = useNavigation();
  const { users } = useUsers();
  if (state === "loading") return <Loading />;

  return (
    <>
      <Hello />
      <div className="mt-12 space-y-8">
        {users.length ? (
          users.map((user, index) => (
            <Link className="block" to={`/users/${user.id}`}>
              <Avatar
                key={index}
                image="https://i.pravatar.cc/150?u=fake@pravatar.com"
                {...user}
              />
            </Link>
          ))
        ) : (
          <span>No users</span>
        )}
      </div>
    </>
  );
}
