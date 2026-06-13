import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  
  const baseStyle = "inline-flex items-center justify-center font-sans font-bold tracking-wide rounded-xl transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-maroon-800 hover:bg-maroon-900 text-stone-100 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 focus:ring-maroon-750",
    secondary: "bg-stone-150 hover:bg-stone-200 text-stone-800 border border-stone-250/20 active:translate-y-0 focus:ring-stone-500",
    outline: "border border-maroon-900 text-maroon-900 hover:bg-maroon-900 hover:text-white focus:ring-maroon-900",
    gold: "bg-gold-500 hover:bg-gold-650 text-maroon-950 shadow-md hover:shadow-lg focus:ring-gold-500",
    ghost: "text-stone-600 hover:bg-stone-100/60 hover:text-stone-900 focus:ring-stone-100"
  };

  const sizes = {
    sm: "px-3.5 py-2 text-[11px]",
    md: "px-5 py-2.5 text-xs",
    lg: "px-7 py-3 py-3.5 text-sm"
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
