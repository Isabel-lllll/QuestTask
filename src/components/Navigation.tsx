import { Link, useLocation } from "react-router-dom";
import { CheckSquare, Award, User } from "lucide-react";
import { cn } from "@/lib/utils";

export const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: "/", icon: CheckSquare, label: "Tasks" },
    { path: "/achievements", icon: Award, label: "Achievements" },
    { path: "/profile", icon: User, label: "Profile" },
  ];
  
  return (
    <nav className="border-b border-white/10 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <h1 className="font-serif text-2xl font-bold text-white">TaskQuest</h1>
          </Link>
          
          <div className="flex gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-glow-blue"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};
