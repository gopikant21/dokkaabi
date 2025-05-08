
import { Search, BellRing, ChevronDown, Menu } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TopNavProps {
  toggleSidebar: () => void;
  sidebarCollapsed: boolean;
}

export default function TopNav({ toggleSidebar, sidebarCollapsed }: TopNavProps) {
  const { user, logout } = useApp();
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <header className="h-16 border-b border-dashboard-border bg-dashboard-dark-bg flex items-center justify-between px-4">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2"
          aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <Menu size={20} />
        </Button>
        
        <div className="relative ml-2">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for jobs, candidates and more..."
            className="bg-dashboard-card-bg border border-dashboard-border rounded-full pl-10 pr-4 py-2 w-80 focus:outline-none focus:ring-2 focus:ring-dashboard-accent-purple/40 text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <BellRing size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center space-x-2">
              <Avatar className="h-8 w-8">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={user?.name} />
                ) : (
                  <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                )}
              </Avatar>
              <div className="flex items-center text-sm">
                <span>{user?.name}</span>
                <ChevronDown size={16} className="ml-1" />
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
