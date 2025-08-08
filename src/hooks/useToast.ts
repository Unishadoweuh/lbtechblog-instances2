"use client";

import { useCallback } from "react";
import { useToastStore, Toast } from "@/stores/toast";

interface ToastOptions extends Omit<Toast, "id"> {
  duration?: number;
}

export function useToast() {
  const addToast = useToastStore((state) => state.addToast);
  const removeToast = useToastStore((state) => state.removeToast);

  const toast = useCallback(
    ({ duration = 3000, ...rest }: ToastOptions) => {
      const id = addToast(rest);
      if (duration > 0) {
        setTimeout(() => removeToast(id), duration);
      }
      return id;
    },
    [addToast, removeToast]
  );

  return { toast };
}
