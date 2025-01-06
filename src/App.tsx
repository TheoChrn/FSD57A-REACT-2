import { Avatar } from "@/components/avatar";
import { Hello } from "@/components/hello-world";
import { API_URL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const profiles = [
    {
      firstname: "Homer",
      lastname: "Simpson",
      image: "https://i.pravatar.cc/300",
    },
    {
      firstname: "Bart",
      lastname: "Simpson",
      image: "https://i.pravatar.cc/300",
    },
  ];

  useEffect(() => {
    const getUsers = async () => {
      try {
        setIsLoading(true);
        const users = await axios.get(`${API_URL}/users`);
        setUsers(users.data);
      } catch (error) {
        console.error(error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch data"
        );
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  if (isLoading) return "loading...";

  if (error) return <span>{error}</span>;

  return (
    <>
      <Hello />
      {profiles.length &&
        profiles.map((user, index) => <Avatar key={index} {...user} />)}
      {users.length ? (
        users.map((user, index) => (
          <Avatar
            key={index}
            firstname={user.firstname}
            lastname={user.lastname}
            website={user.website}
          />
        ))
      ) : (
        <div>No users</div>
      )}
    </>
  );
}

export default App;
