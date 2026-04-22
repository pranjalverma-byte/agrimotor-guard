import { useMotorSimulation } from "@/hooks/useMotorSimulation";
import { Outlet } from "@tanstack/react-router";
import { NavBar } from "./NavBar";

export function AppLayout() {
  // Start real-time motor simulation for all authenticated pages
  useMotorSimulation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-6">
        <Outlet />
      </main>
      <footer className="bg-muted/40 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
