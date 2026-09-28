import { Eye, EyeOff, Zap } from "lucide-react";
import { useState } from "react";

import Logo from "@/components/Logo";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const register = false;
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (email && password) {
      login(email, password);
      navigate("/chat", {
        replace: true,
      });
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f8fc] px-4 py-10">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-[0_24px_80px_rgba(43,39,96,0.1)] md:grid-cols-[0.9fr_1.1fr]">
        <section className="hidden flex-col justify-between bg-[#6253d9] p-10 text-white md:flex">
          <div>
            <Logo />
            <p className="mt-24 max-w-xs text-4xl font-semibold leading-tight">
              A quieter way to stay connected.
            </p>
            <p className="mt-5 max-w-sm text-sm leading-6 text-white/70">
              Bring your conversations, ideas, and people together in one
              thoughtful workspace.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <Zap className="size-3.5" /> Simple by design
          </div>
        </section>
        <section className="p-7 sm:p-12">
          <div className="mb-10 md:hidden">
            <Logo />
          </div>
          <div className="mx-auto max-w-sm">
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-[#6253d9]">
                {register ? "Get started" : "Welcome back"}
              </p>
              <h1 className="text-3xl font-semibold tracking-tight">
                {register ? "Create your account" : "Sign in to Luma"}
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                {register
                  ? "Start chatting with your friends and team."
                  : "Sign in to continue to your conversations."}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {register && (
                <label className="grid gap-2 text-sm font-medium">
                  Full name
                  <Input className="field" placeholder="Alex Morgan" />
                </label>
              )}
              <label className="grid gap-2 text-sm font-medium">
                Email
                <Input
                  className="field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </label>
              <label className="grid gap-2 text-sm font-medium">
                Password
                <div className="relative">
                  <Input
                    className="field pr-12"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    aria-label="Toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                  >
                    {showPassword ? (
                      <Eye className="size-3.5" />
                    ) : (
                      <EyeOff className="size-3.5" />
                    )}
                  </button>
                </div>
              </label>
              {register && (
                <label className="grid gap-2 text-sm font-medium">
                  Confirm password
                  <Input
                    className="field"
                    type="password"
                    placeholder="••••••••"
                  />
                </label>
              )}
              {register ? (
                <label className="flex items-start gap-2 text-xs text-muted-foreground">
                  <Checkbox className="mt-0.5 accent-[#6253d9]" /> I agree to
                  the <span className="font-medium text-foreground">Terms</span>{" "}
                  and{" "}
                  <span className="font-medium text-foreground">
                    Privacy Policy
                  </span>
                </label>
              ) : (
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <Checkbox className="mt-0.5 accent-[#6253d9]" /> Remember me
                  </label>
                  <button className="font-medium text-[#6253d9]">
                    Forgot password?
                  </button>
                </div>
              )}
              <button
                onClick={handleSubmit}
                className="mt-2 flex h-11 items-center justify-center rounded-xl bg-[#6253d9] text-sm font-semibold text-white transition hover:bg-[#5143c8]"
              >
                {register ? "Create account" : "Sign in"}
              </button>
              <div className="flex items-center gap-3 py-1 text-xs text-muted-foreground">
                <div className="h-px flex-1 bg-border" /> OR{" "}
                <div className="h-px flex-1 bg-border" />
              </div>
              <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-border text-sm font-medium transition hover:bg-muted">
                <span className="text-base font-bold">G</span> Continue with
                Google
              </button>
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              {register ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-semibold text-[#6253d9]"
              >
                {register ? "Sign in" : "Create an account"}
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
