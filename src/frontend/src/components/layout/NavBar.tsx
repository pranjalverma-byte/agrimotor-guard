import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDeviceStore } from "@/store/deviceStore";
import { useMotorStore } from "@/store/motorStore";
import { Link, useMatchRoute } from "@tanstack/react-router";
import { LogOut, Moon, Sun, Wifi, Zap } from "lucide-react";
import { useTheme } from "next-themes";

export function NavBar() {
  const { resolvedTheme, setTheme } = useTheme();
  const matchRoute = useMatchRoute();
  const isDashboard = matchRoute({ to: "/dashboard" });
  const isConnections = matchRoute({ to: "/connections" });
  const alerts = useMotorStore((s) => s.alerts);
  const devices = useDeviceStore((s) => s.devices);
  const onlineCount = devices.filter((d) => d.connected).length;

  const navLinks = [
    { to: "/dashboard", label: "Dashboard", active: isDashboard },
    { to: "/connections", label: "Connections", active: isConnections },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-subtle"
      data-ocid="navbar"
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-2 font-display font-bold text-foreground hover:opacity-80 transition-smooth shrink-0"
          data-ocid="navbar.logo_link"
        >
          <div className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="text-sm tracking-tight">AgriFlux</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1" data-ocid="navbar.nav">
          {navLinks.map(({ to, label, active }) => (
            <Link
              key={to}
              to={to}
              className={cn(
                "relative px-4 py-1.5 rounded-full text-sm font-medium transition-smooth",
                active
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
              data-ocid={`navbar.${label.toLowerCase()}_link`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Alert badge */}
          {alerts.length > 0 && (
            <Badge
              variant="destructive"
              className="text-xs px-2 py-0.5 animate-pulse"
              data-ocid="navbar.alert_badge"
            >
              {alerts.length} Alert{alerts.length > 1 ? "s" : ""}
            </Badge>
          )}

          {/* Connections indicator */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
            <Wifi className="w-3.5 h-3.5 text-secondary" />
            <span className="font-medium">
              {onlineCount}/{devices.length} online
            </span>
          </div>

          {/* Theme toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full"
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            data-ocid="navbar.theme_toggle"
            aria-label="Toggle dark mode"
          >
            {resolvedTheme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>

          {/* Logout */}
          <Button
            variant="ghost"
            size="sm"
            className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground rounded-full"
            onClick={() => {
              sessionStorage.removeItem("agriflux_auth");
              window.location.href = "/login";
            }}
            data-ocid="navbar.logout_button"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
