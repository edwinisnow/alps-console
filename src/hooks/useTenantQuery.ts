import { useContext } from "react";
import { TenantContext } from "../data/graphql";
import useFetchGraphQL from "./useFetchGraphQL";
import type { QueryHookOptions } from "../types";

export function useTenantQuery<TVars extends Record<string, any>>(
  query: string,
  options: QueryHookOptions<TVars> = {},
  enabled = true,
) {
  const tenantId = useContext(TenantContext);
  const mergedVariables = { ...(options.variables ?? {}), tenantId };

  return useFetchGraphQL(query, mergedVariables, enabled);
}