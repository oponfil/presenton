"use client";

import React, { createContext, useContext } from "react";

type PublicConfig = { hideDashboard: boolean; hideUpload: boolean; hideCreateTemplate: boolean };

const PublicConfigContext = createContext<PublicConfig>({
  hideDashboard: false,
  hideUpload: false,
  hideCreateTemplate: false,
});

export function PublicConfigProvider({
  hideDashboard,
  hideUpload,
  hideCreateTemplate,
  children,
}: {
  hideDashboard: boolean;
  hideUpload?: boolean;
  hideCreateTemplate?: boolean;
  children: React.ReactNode;
}) {
  return (
    <PublicConfigContext.Provider value={{ hideDashboard, hideUpload: hideUpload ?? false, hideCreateTemplate: hideCreateTemplate ?? false }}>
      {children}
    </PublicConfigContext.Provider>
  );
}

export function usePublicConfig() {
  return useContext(PublicConfigContext);
}
