import Navigation from "../components/Navigation";
import { Outlet } from "react-router";
import { Toaster } from "@/components/ui/sonner";

function RootLayout() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}

export default RootLayout;
