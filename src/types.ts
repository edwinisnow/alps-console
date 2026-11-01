export type TenantId = "tenant-alpha" | "tenant-beta";

export type QueryHookOptions<TVars> = {
  variables?: TVars;
  fetchFirst?: boolean;
  queryKey?: string;
};

export type UseQueryResult<TData, TVars> = {
  loading: boolean;
  errors: string[];
  data: TData | undefined;
  refetch: (variables?: TVars, replace?: boolean) => Promise<void>;
  reset: (queryKey?: string) => void;
};

export type UseMutationResult<TData, TVars> = {
  loading: boolean;
  errors: string[];
  mutateData: (variables?: TVars, replace?: boolean) => Promise<TData | undefined>;
};