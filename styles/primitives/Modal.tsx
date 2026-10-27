'use client';

import { type ReactNode, useEffect, useId, useRef } from 'react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: ReactNode;
  /** Footer content, usually a Cancel and a confirm Button. */
  children?: ReactNode;
  className?: string;
}

export function Modal({
  open,
  onClose,
  title,
  description,
  icon,
  children,
  className,
}: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    // Keyboard dismissal is native: Escape fires the dialog's close event.
    // biome-ignore lint/a11y/useKeyWithClickEvents: click is backdrop-only
    <dialog
      ref={ref}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose();
      }}
      className={cn(
        'm-auto w-[calc(100%-2rem)] max-w-lg overflow-hidden rounded-xl border border-mono-200 bg-white p-0 text-mono-950 shadow-lg',
        'backdrop:bg-mono-950/40',
        className,
      )}
    >
      <div className="flex gap-4 p-4 sm:p-5">
        {icon && (
          <span
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-mono-100 text-mono-950 [&>svg]:h-6 [&>svg]:w-6"
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
        <div className="flex min-w-0 flex-col gap-1">
          <h2 id={titleId} className="text-base font-semibold">
            {title}
          </h2>
          {description && (
            <p id={descriptionId} className="text-sm text-mono-600">
              {description}
            </p>
          )}
        </div>
      </div>
      {children && (
        <div className="flex justify-end gap-3 border-t border-mono-200 p-4 sm:px-5">
          {children}
        </div>
      )}
    </dialog>
  );
}
