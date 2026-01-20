import { Link, useLocation } from "react-router-dom";
import { Home, Building2, Users, MapPin, Search } from "lucide-react";

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "الرئيسية", icon: Home },
    { path: "/units", label: "الوحدات", icon: Building2 },
    { path: "/projects", label: "المشاريع", icon: Building2 },
    { path: "/developers", label: "المطورين", icon: Users },
    { path: "/search", label: "بحث", icon: Search },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                RK
              </span>
              <span className="text-xs text-muted-foreground font-semibold tracking-wider">
                REAL ESTATE
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
