import { Avatar } from "@/components/avatar";
import { Hello } from "@/components/hello-world";

function App() {
  const profiles = [
    {
      firstName: "Homer",
      lastName: "Simpson",
      image: "https://i.pravatar.cc/300",
    },
    {
      firstName: "Bart",
      lastName: "Simpson",
      image: "https://i.pravatar.cc/300",
    },
  ];
  return (
    <>
      <Hello />
      {profiles.length &&
        profiles.map((user, index) => <Avatar key={index} {...user} />)}
    </>
  );
}

export default App;
