"use client";

import React, { createContext, useContext } from "react";

type PublicConfig = { hideDashboard: boolean };

const PublicConfigContext = createContext<PublicConfig>({ hideDashboard: false });

export function PublicConfigProvider({
  hideDashboard,
  children,
}: {
  hideDashboard: boolean;
  children: React.ReactNode;
}) {
  return (
    <PublicConfigContext.Provider value={{ hideDashboard }}>
      {children}
    </PublicConfigContext.Provider>
  );
}

export function usePublicConfig() {
  return useContext(PublicConfigContext);
}
