import { Outlet } from "react-router";
import NavSidebar from "../organisms/NavSidebar/NavSidebar";
import { SidebarProvider } from "../atoms/Sidebar/Sidebar";
import Header from "../organisms/Header/Header";

export default function AppTemplate() {
  return (
    <SidebarProvider>
      <div className="flex w-full">
        <NavSidebar />
        <main className="w-full">
          <Header />
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
