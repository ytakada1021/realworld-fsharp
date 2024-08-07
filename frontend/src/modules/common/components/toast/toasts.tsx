"use client";

import { Toast } from "./toast";
import { useToast } from "./useToast";

export const Toasts = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <Toast key={toast.id} header={toast.header} body={toast.body} onClickClose={() => removeToast(toast.id)} />
      ))}
    </div>
  );
};
