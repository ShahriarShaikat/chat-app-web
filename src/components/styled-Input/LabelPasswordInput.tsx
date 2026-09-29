import { Eye, EyeOff } from "lucide-react";
import { useState, type ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type LabelPasswordInputProps<T extends FieldValues = FieldValues> = {
  label: string;
  control: Control<T>;
  name: FieldPath<T>;
  placeholder?: string;
  icon?: ReactNode;
  disabled?: boolean;
  error?: {
    message?: string;
  };
  className?: string;
};

const LabelPasswordInput = <T extends FieldValues = FieldValues>({
  label,
  control,
  name,
  placeholder = "••••••••",
  icon,
  disabled = false,
  error,
  className,
}: LabelPasswordInputProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative flex items-center">
            {icon && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {icon}
              </span>
            )}
            <Input
              {...field}
              id={name}
              type={showPassword ? "text" : "password"}
              placeholder={placeholder}
              disabled={disabled}
              //   className={cn(
              //     "pr-12 focus-visible:ring-0 h-10",
              //     error?.message && "border-destructive",
              //   )}
              className={cn(
                "focus-visible:ring-0 h-10 pr-12",
                icon && "pl-9",
                error?.message && "border-destructive",
              )}
            />

            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={disabled}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              {showPassword ? (
                <Eye className="size-3.5" />
              ) : (
                <EyeOff className="size-3.5" />
              )}
            </button>
          </div>
        )}
      />

      {error?.message && (
        <p className="text-sm font-normal text-destructive">{error.message}</p>
      )}
    </div>
  );
};

export default LabelPasswordInput;
