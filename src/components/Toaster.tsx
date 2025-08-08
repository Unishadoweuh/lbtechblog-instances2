"use client";

import { useToastStore } from "@/stores/toast";

export function Toaster() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <div className="fixed top-4 right-4 flex flex-col gap-2 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="rounded bg-gray-800 text-white px-4 py-2 shadow"
        >
          <p className="font-medium">{toast.title}</p>
          {toast.description && (
            <p className="text-sm opacity-80">{toast.description}</p>
          )}
        </div>
      ))}
    </div>
  );
}
