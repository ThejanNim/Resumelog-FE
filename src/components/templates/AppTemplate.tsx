import { Outlet } from "react-router";
import NavSidebar from "../organisms/NavSidebar/NavSidebar";
import { SidebarProvider } from "../atoms/Sidebar/Sidebar";

export default function AppTemplate() {
  return (
    <SidebarProvider>
      <div className="flex">
        <NavSidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  );
}
