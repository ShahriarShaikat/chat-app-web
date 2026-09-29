import type { ReactNode } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import { Controller } from "react-hook-form";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type LabeledInputProps<T extends FieldValues = FieldValues> = {
  label: string;
  control: Control<T>;
  name: FieldPath<T>;

  type?:
    | "number"
    | "search"
    | "time"
    | "text"
    | "hidden"
    | "tel"
    | "url"
    | "email"
    | "date"
    | "datetime-local"
    | "month"
    | "password"
    | "week";

  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";

  min?: number;
  max?: number;

  disabled?: boolean;

  error?: {
    message?: string;
  };

  onChange?: (value: string) => void;

  className?: string;
};

const LabeledInput = <T extends FieldValues>({
  label,
  control,
  name,
  type = "text",
  placeholder,
  icon,
  iconPosition = "left",
  min,
  max,
  disabled = false,
  error,
  onChange,
  className,
}: LabeledInputProps<T>) => {
  return (
    <div className={cn("grid gap-2", className)}>
      <Label htmlFor={name}>{label}</Label>

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative flex items-center">
            {icon && iconPosition === "left" && (
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {icon}
              </span>
            )}

            <Input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              min={min}
              max={max}
              className={cn(
                "focus-visible:ring-0 h-10",
                icon && iconPosition === "left" && "pl-9",
                icon && iconPosition === "right" && "pr-9",
                error && "border-destructive",
              )}
              onChange={(e) => {
                field.onChange(e);

                onChange?.(e.target.value);
              }}
            />

            {icon && iconPosition === "right" && (
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {icon}
              </span>
            )}
          </div>
        )}
      />

      {error?.message && (
        <p className="text-sm font-normal text-destructive">{error.message}</p>
      )}
    </div>
  );
};

export default LabeledInput;
