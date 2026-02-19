import { useState } from "react";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Topbar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <main className="flex-1 pt-14 lg:pl-64">
        <div className="p-4 md:p-6 lg:p-8">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default AppLayout;
