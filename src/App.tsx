import { Avatar } from "@/components/avatar";
import { Hello } from "@/components/hello-world";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [users, setUsers] = useState<User[]>([]);

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
        const users = await axios.get("https://jsonplaceholder.org/users");
        setUsers(users.data);
      } catch (error) {
        console.error(error);
      }
    };
    getUsers();
  }, []);

  return (
    <>
      <Hello />
      {profiles.length &&
        profiles.map((user, index) => <Avatar key={index} {...user} />)}
      {users.length &&
        users.map((user, index) => (
          <Avatar
            key={index}
            firstname={user.firstname}
            lastname={user.lastname}
            website={user.website}
          />
        ))}
    </>
  );
}

export default App;
