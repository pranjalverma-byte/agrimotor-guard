import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "@tanstack/react-router";
import { Eye, EyeOff, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setIsLoading(true);
    // Simulate auth delay
    await new Promise((r) => setTimeout(r, 900));
    sessionStorage.setItem("agriflux_auth", "true");
    if (rememberMe) localStorage.setItem("agriflux_remember", "true");
    setIsLoading(false);
    router.navigate({ to: "/dashboard" });
  };

  return (
    <div
      className="min-h-screen bg-background flex items-center justify-center px-4"
      data-ocid="login.page"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-primary shadow-elevated mb-4">
            <Zap className="w-6 h-6 text-primary-foreground" />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
            AgriFlux
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            DC Motor Monitoring &amp; Control
          </p>
        </div>

        {/* Card */}
        <div className="bg-card rounded-2xl border border-border shadow-elevated p-8">
          <h2 className="font-display text-lg font-semibold text-foreground mb-6">
            Sign in to your account
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@agriflux.io"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-10 rounded-xl border-input bg-background"
                autoComplete="email"
                data-ocid="login.email_input"
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-10 rounded-xl border-input bg-background pr-10"
                  autoComplete="current-password"
                  data-ocid="login.password_input"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  data-ocid="login.toggle_password"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="remember"
                checked={rememberMe}
                onCheckedChange={(v) => setRememberMe(!!v)}
                data-ocid="login.remember_checkbox"
              />
              <Label
                htmlFor="remember"
                className="text-sm text-muted-foreground cursor-pointer"
              >
                Remember me
              </Label>
            </div>

            {/* Error */}
            {error && (
              <p
                className="text-sm text-destructive font-medium"
                data-ocid="login.field_error"
              >
                {error}
              </p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              className="w-full h-10 rounded-xl font-semibold"
              disabled={isLoading}
              data-ocid="login.submit_button"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Signing in…
                </span>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Secure IoT dashboard for agricultural motor control
        </p>
      </motion.div>
    </div>
  );
}
