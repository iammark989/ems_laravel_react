import { useState } from "react";
//import { useNavigate, useLocation } from "react-router-dom";
import { router, usePage } from "@inertiajs/react";

import {
  LayoutDashboard, Users, ChevronDown, ChevronRight, Upload, FileText,
  Settings, LogOut, UserCircle, ClipboardList, DollarSign, BarChart3,
  Building2, Clock, FileSpreadsheet, X
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: { label: string; icon: React.ReactNode; path: string }[];
}

const adminMenu: MenuItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" />, path: "/" },
  {
    label: "Employee", icon: <Users className="w-5 h-5" />,
    children: [
      { label: "Employee Masterlist", icon: <ClipboardList className="w-4 h-4" />, path: "/employees" },
      { label: "Employee Attendance", icon: <Clock className="w-4 h-4" />, path: "/employees/attendance" },
      { label: "Employee Registration", icon: <UserCircle className="w-4 h-4" />, path: "/employees/register" },
    ],
  },
  {
    label: "Payroll", icon: <DollarSign className="w-5 h-5" />,
    children: [
      { label: "Upload Attendance", icon: <Upload className="w-4 h-4" />, path: "/payroll/upload-attendance" },
      { label: "Upload Payroll", icon: <FileSpreadsheet className="w-4 h-4" />, path: "/payroll/upload-payroll" },
    ],
  },
  {
    label: "Reports", icon: <BarChart3 className="w-5 h-5" />,
    children: [
      { label: "Attendance Summary", icon: <FileText className="w-4 h-4" />, path: "/reports/attendance" },
      { label: "Payroll Analytics", icon: <BarChart3 className="w-4 h-4" />, path: "/reports/payroll" },
    ],
  },
  {
    label: "Settings", icon: <Settings className="w-5 h-5" />,
    children: [
      { label: "Payroll Settings", icon: <DollarSign className="w-4 h-4" />, path: "/settings/payroll" },
      { label: "Company Settings", icon: <Building2 className="w-4 h-4" />, path: "/settings/company" },
    ],
  },
];

const employeeMenu: MenuItem[] = [
  {
    label: "Employee Panel", icon: <UserCircle className="w-5 h-5" />,
    children: [
      { label: "View Attendance", icon: <Clock className="w-4 h-4" />, path: "/self-service/attendance" },
      { label: "View Payslip", icon: <FileText className="w-4 h-4" />, path: "/self-service/payslip" },
    ],
  },
];

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const [expandedMenus, setExpandedMenus] = useState<string[]>(["Employee"]);
  const { url } = usePage();
  const { auth } = usePage().props as any;
  const { position } = usePage().props as any;

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  const handleNavigate = (path: string) => {
    router.visit(path);
    // Auto-close on mobile
    if (window.innerWidth < 1024) onClose();
  };

  const renderMenu = (items: MenuItem[]) =>
    items.map((item) => {
      const isExpanded = expandedMenus.includes(item.label);
      const isActive = item.path === url;
      

      if (item.children) {
        const childActive = item.children.some((c) => c.path === url);
        return (
          <div key={item.label}>
            <button
              onClick={() => toggleMenu(item.label)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sky-800 hover:bg-sky-100 transition-colors ${childActive ? "bg-sky-200 text-sky-900" : ""}`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </button>
            {isExpanded && (
              <div className="ml-4 mt-1 space-y-1">
                {item.children.map((child) => (
                  <button
                    key={child.path}
                    onClick={() => handleNavigate(child.path)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-colors ${
                      url === child.path
                      ? "bg-sky-500 text-white font-medium"
                      : "text-sky-700 hover:bg-sky-100 hover:text-sky-900"
                    }`}
                  >
                    {child.icon}
                    {child.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <button
          key={item.label}
          onClick={() => handleNavigate(item.path!)}
          className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
            isActive
              ? "bg-sky-500 text-white"
              : "text-sky-700 hover:bg-sky-100"
          }`}
        >
          {item.icon}
          {item.label}
        </button>
      );
    });

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-foreground/40 z-40 lg:hidden" onClick={onClose} />
      )}

      {/* Sidebar */}
      <aside
          className={`fixed top-14 left-0 bottom-0 z-50 w-64 
          bg-sky-50 border-r border-sky-200
          overflow-y-auto transition-transform duration-300 
          lg:translate-x-0 ${
            isOpen ? "translate-x-0 animate-slide-in" : "-translate-x-full"
          }`}
        >
        {/* Close button (mobile) */}
        <button onClick={onClose} className="absolute top-3 right-3 text-sidebar-foreground/80 hover:text-sidebar-foreground lg:hidden">
          <X className="w-5 h-5" />
        </button>

        {/* User Profile */}
        <div className="p-6 flex flex-col items-center border-b border-sky-200">
                    <img
            src={`/images/${auth.user.images}`}
            alt="User Avatar"
            className="w-16 h-16 rounded-full object-cover border-2 border-sky-500"
            onError={(e) => (e.currentTarget.src = "/images/fallback-image.jpg")}
          />
          <p className="text-sky-900 font-semibold text-sm">{ auth.user.name.toUpperCase() }</p>
          <p className="text-sky-600 text-xs">{ position?.position.toUpperCase() }</p>
        </div>

        {/* Admin Menu */}
        <nav className="p-3 space-y-1">
          <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sky-500">
            Admin / HR Panel
          </p>
          {renderMenu(adminMenu)}

          <div className="my-3 border-t border-sidebar-border" />

          <p className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-sky-500">
            Employee Self-Service
          </p>
          {renderMenu(employeeMenu)}
        </nav>

        {/* Logout */}
        <div className="p-3 mt-auto border-t border-sidebar-border">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 transition-colors text-sm font-medium"
            onClick={() => router.post('/logout')}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};
 
export default Sidebar;
