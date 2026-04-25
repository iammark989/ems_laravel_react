import { Menu, Bell, Search } from "lucide-react";
import { usePage } from "@inertiajs/react";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  const { auth,company } = usePage().props as any;


  const companyname = company.company_name == null ? 'Employee Management System' : company.company_name;
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 
      bg-sky-500 shadow-md flex items-center justify-between px-6">

      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm 
          flex items-center justify-center">
          <span className="text-white font-bold text-sm"><img className="w-9 h-9 rounded-full object-cover border-2 border-sky-500" src={`/images/${company.logo}` } /></span>
        </div>

        <span className="text-white font-semibold text-lg hidden sm:block">
          {companyname}
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button className="p-2 rounded-xl text-white/90 
          hover:bg-white/20 transition-all duration-200">
          <Search className="w-5 h-5" />
        </button>

        <button className="relative p-2 rounded-xl text-white/90 
          hover:bg-white/20 transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 
            bg-red-500 rounded-full" />
        </button>

        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-white 
            hover:bg-white/20 transition-all duration-200 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;