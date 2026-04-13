import React from "react";

type ButtonVariant = "primary" | "outline";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  className = "",
  ...props
}) => {
  const base =
    "px-6 py-3 rounded-xl font-semibold transition-all duration-200 cursor-pointer ";

  const variants: Record<ButtonVariant, string> = {
    primary:
      "bg-[#0d6efd] text-white hover:bg-[#0b5ed7] shadow-md",
    outline:
      "border border-white text-white bg-transparent hover:bg-white/10",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;