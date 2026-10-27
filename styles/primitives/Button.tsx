import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

const variants = {
  primary: 'bg-blue-500 text-white hover:bg-blue-700',
  secondary:
    'bg-mono-100 text-mono-600 hover:bg-white hover:border-2 hover:border-mono-300 hover:text-mono-950',
  outline:
    'border-2 border-mono-300 bg-transparent text-mono-950 hover:bg-gray-50 hover:bg-mono-100 hover:text-mono-600 hover:border-none hover:text-mono-600',
  ghost: 'bg-transparent hover:bg-gray-100',
  danger: 'bg-red-600 text-white hover:bg-red-700',
} as const;

const sizes = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4',
  lg: 'h-12 px-6 text-lg',
} as const;

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  loading?: boolean;
  leftIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      leftIcon,
      disabled,
      className,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
          'disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading ? (
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          leftIcon && (
            <span
              className="inline-flex shrink-0 [&>svg]:h-5 [&>svg]:w-5"
              aria-hidden="true"
            >
              {leftIcon}
            </span>
          )
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
