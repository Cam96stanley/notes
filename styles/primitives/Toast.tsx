'use client';

import { CheckCircleIcon, XIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ToastProps extends HTMLAttributes<HTMLOutputElement> {
  message: string;
  actionLabel?: string;
  actionHref?: string;
  onClose?: () => void;
}

export function Toast({
  message,
  actionLabel,
  actionHref,
  onClose,
  className,
  ...props
}: ToastProps) {
  return (
    <output
      className={cn(
        'flex w-full items-center gap-2 rounded-lg border border-mono-200 bg-white px-4 py-3 shadow-sm',
        className,
      )}
      {...props}
    >
      <CheckCircleIcon
        weight="fill"
        className="h-5 w-5 shrink-0 text-green-500"
        aria-hidden="true"
      />
      <p className="flex-1 text-sm font-medium text-mono-950">{message}</p>
      {actionLabel && actionHref && (
        <Link
          href={actionHref}
          className="text-sm font-medium text-mono-950 underline underline-offset-2 hover:text-mono-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          {actionLabel}
        </Link>
      )}
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="inline-flex shrink-0 cursor-pointer text-mono-400 transition-colors hover:text-mono-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          <XIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      )}
    </output>
  );
}
