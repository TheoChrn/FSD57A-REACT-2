import { Header } from "@/components/nav-bar";
import { Outlet } from "react-router";

export default function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
