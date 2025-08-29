import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick: (data?: any) => void;
  className?: string;
  disabled?: boolean;
}

const Button = ({ children, onClick, className, disabled }: ButtonProps) => {
  const baseClasses =
    "px-6 py-3 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition";

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
