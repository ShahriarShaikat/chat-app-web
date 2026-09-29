import { login } from "@/auth/auth-api";
import Logo from "@/components/Logo";
import LabeledInput from "@/components/styled-Input/LabelInput";
import LabelPasswordInput from "@/components/styled-Input/LabelPasswordInput";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/hooks/useAuth";
import { loginSchema, type TLoginSchema } from "@/lib/zod/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, Zap } from "lucide-react";
import { enqueueSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const register = false;
  const navigate = useNavigate();
  const { invokeLogin } = useAuth();

  const {
    control,
    handleSubmit,
    reset,
    setError,
    // watch,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: TLoginSchema) => {
    console.log("🚀 ~ onSubmit ~ values:", values);
    try {
      const loginResponse = await login(values.email, values.password);
      if (loginResponse?.success && loginResponse.payload) {
        await invokeLogin(loginResponse.payload.accessToken);
        enqueueSnackbar("Login Successfully", {
          anchorOrigin: { horizontal: "center", vertical: "bottom" },
          autoHideDuration: 3000,
          variant: "success",
        });
        reset();
        navigate("/chat");
      } else {
        setError("root", {
          type: "server",
          message: "Invalid email or password",
        });
        // showReport(
        //   "Error",
        //   "Blacklist Failed",
        //   response.error?.message ||
        //     response.message ||
        //     "Unable to create this blacklist entry.",
        // );
      }
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
      setError("root", {
        type: "server",
        message: "Invalid email or password",
      });
      // showReport(
      //   "Error",
      //   "Unexpected Error",
      //   "An unexpected error occurred. Please try again.",
      // );
    }
  };

  // const handleSubmit = () => {
  //   if (email && password) {
  //     login(email, password);
  //     navigate("/chat", {
  //       replace: true,
  //     });
  //   }
  // };

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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-4">
                <LabeledInput
                  label="Email"
                  name="email"
                  type="email"
                  control={control}
                  placeholder="alex@example.com"
                  icon={<Mail className="size-4" />}
                  iconPosition="left"
                  error={errors.email}
                />

                <LabelPasswordInput
                  label="Password"
                  name="password"
                  control={control}
                  placeholder="Enter your password"
                  icon={<Lock className="size-4" />}
                  error={errors.password}
                />
                <div className="flex items-center justify-between text-xs">
                  <label className="flex items-center gap-2 text-muted-foreground">
                    <Checkbox className="mt-0.5 accent-[#6253d9]" /> Remember me
                  </label>
                  <button className="font-medium text-[#6253d9]">
                    Forgot password?
                  </button>
                </div>

                {errors?.root && (
                  <div>
                    <p className="text-sm font-normal text-destructive">
                      {errors?.root?.message}
                    </p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="mt-2 flex h-11 items-center justify-center rounded-xl bg-[#6253d9] text-sm font-semibold text-white transition hover:bg-[#5143c8]"
                >
                  Sign in
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
            </form>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/register")}
                className="font-semibold text-[#6253d9]"
              >
                Create an account
              </button>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
