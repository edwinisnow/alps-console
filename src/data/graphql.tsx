import { createContext } from "react";
import type { TenantId } from "../types";

export const TenantContext = createContext<TenantId>("tenant-alpha");

export function TenantProvider({
  tenantId,
  children,
}: {
  tenantId: TenantId;
  children: React.ReactNode;
}) {
  return (
    <TenantContext.Provider value={tenantId}>{children}</TenantContext.Provider>
  );
}

