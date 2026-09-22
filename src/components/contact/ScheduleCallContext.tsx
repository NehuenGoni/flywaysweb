"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import type { BusinessUnit } from "@/lib/analytics";

type ScheduleCallOpenOptions = {
  businessUnit?: BusinessUnit;
  experience?: string;
};

type ScheduleCallContextValue = {
  open: boolean;
  context: ScheduleCallOpenOptions;
  openModal: (options?: ScheduleCallOpenOptions) => void;
  closeModal: () => void;
};

const ScheduleCallContext = createContext<ScheduleCallContextValue | null>(null);

/** Global state for the "Schedule a Call" modal, mounted once in the root layout. */
export function ScheduleCallProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [context, setContext] = useState<ScheduleCallOpenOptions>({});

  const openModal = useCallback((options?: ScheduleCallOpenOptions) => {
    setContext(options ?? {});
    setOpen(true);
  }, []);
  const closeModal = useCallback(() => setOpen(false), []);

  const value = useMemo(
    () => ({ open, context, openModal, closeModal }),
    [open, context, openModal, closeModal],
  );

  return <ScheduleCallContext.Provider value={value}>{children}</ScheduleCallContext.Provider>;
}

export function useScheduleCall() {
  const ctx = useContext(ScheduleCallContext);
  if (!ctx) {
    throw new Error("useScheduleCall must be used within a ScheduleCallProvider");
  }
  return ctx;
}
