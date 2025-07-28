import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        className={cn(
          // Base styles
          "flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base md:text-sm shadow-xs",
          "border-input dark:bg-input/30 text-white placeholder:text-muted-foreground",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:inline-flex file:h-7",
          "disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none",

          // Selection
          "selection:bg-primary selection:text-primary-foreground",

          // Transitions (no ring)
          "outline-none transition-colors duration-300 ease-in-out",

          // Focus-visible (border only, no ring)
          "focus-visible:outline-none focus-visible:border-purple-500",

          // Validation states
          "aria-invalid:border-destructive",

          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
