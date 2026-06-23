import type { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  footer?: ReactNode;
}

export function Modal({ open, title, onClose, children, footer }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-maroon-950/40 p-4 backdrop-blur-sm">
      <div className="my-8 w-full max-w-2xl rounded-2xl bg-cream-50 shadow-2xl">
        <div className="flex items-center justify-between border-b border-cream-200 px-6 py-4">
          <h2 className="text-lg font-bold text-maroon-950">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-maroon-700 hover:bg-cream-200" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">{children}</div>
        {footer && <div className="flex justify-end gap-3 border-t border-cream-200 px-6 py-4">{footer}</div>}
      </div>
    </div>
  );
}
