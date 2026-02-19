import { Menu, Bell, Search } from "lucide-react";

interface TopbarProps {
  onToggleSidebar: () => void;
}

const Topbar = ({ onToggleSidebar }: TopbarProps) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-14 bg-primary shadow-md flex items-center justify-between px-4">
      {/* Left: Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-primary-foreground/20 flex items-center justify-center">
          <span className="text-primary-foreground font-bold text-sm">HR</span>
        </div>
        <span className="text-primary-foreground font-semibold text-lg hidden sm:block">
          HR Manager
        </span>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors">
          <Search className="w-5 h-5" />
        </button>
        <button className="relative p-2 rounded-lg text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </button>
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg text-primary-foreground hover:bg-primary-foreground/10 transition-colors lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
