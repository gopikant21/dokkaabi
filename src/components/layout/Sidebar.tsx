
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  BarChart2, 
  MessageSquare,
  Calendar,
  FileText,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

interface SidebarProps {
  collapsed: boolean;
}

export default function Sidebar({ collapsed }: SidebarProps) {
  const location = useLocation();
  const { user } = useApp();
  
  // Define navigation items
  const navItems = [
    { 
      title: "Dashboard", 
      path: "/", 
      icon: LayoutDashboard,
      section: "main"
    },
    { 
      title: "Messages", 
      path: "/messages", 
      icon: MessageSquare,
      section: "main",
      badge: 10
    },
    { 
      title: "Calendar", 
      path: "/calendar", 
      icon: Calendar,
      section: "main"
    },
    { 
      title: "Jobs", 
      path: "/jobs", 
      icon: Briefcase,
      section: "recruitment"
    },
    { 
      title: "Candidates", 
      path: "/candidates", 
      icon: Users,
      section: "recruitment"
    },
    { 
      title: "Insights", 
      path: "/insights", 
      icon: BarChart2,
      section: "recruitment"
    },
    { 
      title: "Chatbot", 
      path: "/chatbot", 
      icon: MessageSquare,
      section: "recruitment"
    },
    { 
      title: "Documents", 
      path: "/documents", 
      icon: FileText,
      section: "organization"
    },
    { 
      title: "Settings", 
      path: "/settings", 
      icon: Settings,
      section: "organization"
    }
  ];
  
  // Group navigation items by section
  const sections = {
    main: navItems.filter(item => item.section === "main"),
    recruitment: navItems.filter(item => item.section === "recruitment"),
    organization: navItems.filter(item => item.section === "organization")
  };

  return (
    <aside 
      className={cn(
        "bg-dashboard-dark-bg border-r border-dashboard-border transition-all duration-300",
        collapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 border-b border-dashboard-border flex items-center">
        <div className="h-8 w-8 rounded-full bg-gradient-to-r from-dashboard-accent-purple to-dashboard-accent-pink flex items-center justify-center text-white font-bold">
          TF
        </div>
        {!collapsed && (
          <span className="ml-3 text-xl font-bold">TalentFlow</span>
        )}
      </div>
      
      <div className="py-4">
        {/* Main navigation */}
        <div className="px-4 mb-6">
          {!collapsed && <p className="text-xs text-dashboard-text-secondary uppercase mb-2">Main</p>}
          <ul>
            {sections.main.map((item) => (
              <li key={item.path} className="mb-1">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md sidebar-item",
                    collapsed ? "justify-center" : "",
                    location.pathname === item.path
                      ? "bg-dashboard-card-bg text-dashboard-accent-purple font-medium active"
                      : "text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-dashboard-card-bg"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                  
                  {!collapsed && item.badge && (
                    <span className="ml-auto bg-green-500 text-white text-xs font-medium rounded-full px-2 py-0.5">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Recruitment section */}
        <div className="px-4 mb-6">
          {!collapsed && <p className="text-xs text-dashboard-text-secondary uppercase mb-2">Recruitment</p>}
          <ul>
            {sections.recruitment.map((item) => (
              <li key={item.path} className="mb-1">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md sidebar-item",
                    collapsed ? "justify-center" : "",
                    location.pathname === item.path
                      ? "bg-dashboard-card-bg text-dashboard-accent-purple font-medium active"
                      : "text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-dashboard-card-bg"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Organization section */}
        <div className="px-4">
          {!collapsed && <p className="text-xs text-dashboard-text-secondary uppercase mb-2">Organization</p>}
          <ul>
            {sections.organization.map((item) => (
              <li key={item.path} className="mb-1">
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md sidebar-item",
                    collapsed ? "justify-center" : "",
                    location.pathname === item.path
                      ? "bg-dashboard-card-bg text-dashboard-accent-purple font-medium active"
                      : "text-dashboard-text-secondary hover:text-dashboard-text-primary hover:bg-dashboard-card-bg"
                  )}
                >
                  <item.icon size={20} className="flex-shrink-0" />
                  {!collapsed && <span className="ml-3">{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
