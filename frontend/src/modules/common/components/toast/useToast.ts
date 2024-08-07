import { ReactNode } from "react";
import { create } from "zustand";

type Toast = {
  id: string;
  header: ReactNode;
  body?: ReactNode;
};

type ToastsStore = {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, "id">) => void;
  removeToast: (id: string) => void;
};

export const useToast = create<ToastsStore>((set) => ({
  toasts: [],
  addToast: (toast) =>
    set((prev) => ({
      toasts: [...prev.toasts, { id: crypto.randomUUID(), ...toast }],
    })),
  removeToast: (id) =>
    set((prev) => ({
      toasts: prev.toasts.filter((toast) => toast.id !== id),
    })),
}));
