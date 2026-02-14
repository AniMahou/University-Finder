import { cn } from "../../lib/utils"

export function Badge({ children, className, variant = "default" }) {
  const variants = {
    default: "bg-blue-600 text-white",
    secondary: "bg-gray-200 text-gray-800",
    outline: "border-2 border-gray-300 bg-white text-gray-700",
  };
  
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}