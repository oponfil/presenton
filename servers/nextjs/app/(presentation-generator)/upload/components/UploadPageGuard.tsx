"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePublicConfig } from "@/app/PublicConfigProvider";

const LANDING_TEMPLATE_PREVIEW = "/template-preview";

export function UploadPageGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { hideUpload } = usePublicConfig();

  useEffect(() => {
    if (hideUpload) {
      router.replace(LANDING_TEMPLATE_PREVIEW);
    }
  }, [hideUpload, router]);

  if (hideUpload) {
    return null;
  }

  return <>{children}</>;
}
