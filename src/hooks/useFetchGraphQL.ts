import {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
  useMemo,
} from "react";
import { TenantContext } from "../data/graphql";

const useFetchGraphQL = (
  query: string,
  variables?: Record<string, any>,
  enabled = true,
) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const tenantId = useContext(TenantContext);
  const activeController = useRef<AbortController | null>(null);
  const variablesKey = JSON.stringify(variables);
  const currentVariables = useMemo(
    () =>
      variablesKey === undefined
        ? undefined
        : (JSON.parse(variablesKey) as Record<string, any>),
    [variablesKey],
  );

  const refetch = useCallback(
    async (nextVariables: Record<string, any> | undefined = currentVariables) => {
      activeController.current?.abort();
      const controller = new AbortController();
      activeController.current = controller;

      setLoading(true);
      setError(null);
      try {
        const response = await fetch("http://localhost:3000/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query, variables: nextVariables }),
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`GraphQL request failed: ${response.status}`);
        }

        const result = await response.json();

        if (result.errors?.length) {
          throw new Error(
            result.errors
              .map(({ message }: { message: string }) => message)
              .join("; "),
          );
        }

        setData(result.data);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
          activeController.current = null;
        }
      }
    },
    [query, currentVariables],
  );

  useEffect(() => {
    if (!enabled) return;

    void refetch();

    return () => activeController.current?.abort();
  }, [enabled, refetch, tenantId, variablesKey]);

  return { data, error, loading, refetch };
};

export default useFetchGraphQL;
