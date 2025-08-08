"use client";
import { useEffect } from "react";

export function MockProvider() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && process.env.MOCK === "true") {
      import("./browser").then(({ worker }) => worker.start());
    }
  }, []);
  return null;
}
