"use client";

import { useCallback } from "react";

export function useConfirm(message: string) {
  return useCallback(() => window.confirm(message), [message]);
}
