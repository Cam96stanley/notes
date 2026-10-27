'use client';

import { EyeClosedIcon, EyeIcon, InfoIcon } from '@phosphor-icons/react/ssr';
import {
  forwardRef,
  type InputHTMLAttributes,
  type ReactNode,
  useId,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  hint?: string;
  error?: boolean;
  leftIcon?: ReactNode;
  passwordToggle?: boolean;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      hint,
      error = false,
      leftIcon,
      passwordToggle = false,
      disabled,
      id,
      className,
      containerClassName,
      type = 'text',
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintId = `${inputId}-hint`;
    const [visible, setVisible] = useState(false);
    const hidden = passwordToggle && !visible;

    return (
      <div className={cn('flex w-full flex-col gap-2', containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              'text-base font-medium text-mono-950',
              disabled && 'opacity-50',
            )}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            'flex h-14 items-center gap-3 rounded-lg border bg-white px-5 transition-colors',
            'border-mono-300 hover:bg-mono-50',
            'focus-within:border-mono-950 focus-within:ring-4 focus-within:ring-mono-500/60',
            error &&
              'border-red-500 hover:bg-white focus-within:border-red-500 focus-within:ring-red-500/30',
            disabled &&
              'pointer-events-none border-mono-200 bg-mono-100 opacity-50',
          )}
        >
          {passwordToggle ? (
            <button
              type="button"
              onClick={() => setVisible((v) => !v)}
              disabled={disabled}
              aria-label={visible ? 'Hide text' : 'Show text'}
              aria-pressed={visible}
              className="inline-flex shrink-0 cursor-pointer text-mono-500 hover:text-mono-950 focus-visible:outline-none focus-visible:text-mono-950 [&>svg]:h-6 [&>svg]:w-6"
            >
              {visible ? <EyeIcon /> : <EyeClosedIcon />}
            </button>
          ) : (
            leftIcon && (
              <span
                className="inline-flex shrink-0 text-mono-500 [&>svg]:h-6 [&>svg]:w-6"
                aria-hidden="true"
              >
                {leftIcon}
              </span>
            )
          )}
          <input
            ref={ref}
            id={inputId}
            type={hidden ? 'password' : type}
            disabled={disabled}
            aria-invalid={error || undefined}
            aria-describedby={hint ? hintId : undefined}
            className={cn(
              'min-w-0 flex-1 bg-transparent text-lg text-mono-950 outline-none',
              'placeholder:text-mono-500 disabled:cursor-not-allowed',
              className,
            )}
            {...props}
          />
        </div>
        {hint && (
          <p
            id={hintId}
            className={cn(
              'flex items-center gap-2 text-sm',
              error ? 'text-red-500' : 'text-mono-600',
              disabled && 'opacity-50',
            )}
          >
            <InfoIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            {hint}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
