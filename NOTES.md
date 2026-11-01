# Implementation notes

This submission is incomplete. I prioritized getting the basic tenant-aware device list, selection, and detail flow in place rather than rushing partial implementations of pagination, history, and mutation behavior. Those remaining requirements affect correctness and data isolation, so presenting them as finished without implementing and verifying them would be misleading.

## Race condition

The current fetch hook aborts the previous request when the same hook starts another request, which is intended to prevent an older response from updating that hook's state. This has not been covered by the required deterministic hook test, so it should be treated as unverified. Before relying on it, I would add a request-generation guard as well as a test where an older response arrives last.

## Tenant scoping and switching

`TenantContext` is provided by the app, and `useTenantQuery` injects the current `tenantId` into query variables. There is no shared request cache in this implementation. However, each hook keeps its previous result in local state while a new tenant's request is in flight, so a tenant switch can briefly show data from the prior tenant. I would clear or tenant-scope displayed query state synchronously on tenant changes, and verify that behavior with a test before calling tenant isolation complete.

## Optimistic lock and invalidation

The current lock flow is not optimistic: it sends a hardcoded `act-lock` request and refetches the full list after success. It does not load available actions, update list and detail state before the response, roll back on failure, or update history. The correct next step is to fetch the available action for the device's state, apply a shared optimistic override to both list and detail, and restore the prior values if the mutation fails. On success, update or invalidate only that device's detail and history; do not refetch the whole list.

I have not implemented targeted entity invalidation. The current hook has no cache or entity index to locate all query results containing a device. I would either add entity metadata to cache entries or maintain a small shared device override keyed by tenant and device ID; a query-string-only cache key would not be enough to invalidate an entity reliably.

## Partial GraphQL responses

The current fetch hook treats any GraphQL `errors` as a total failure, so it discards a response that contains both `data` and `errors`. That does not meet the exercise requirement. The intended behavior is to render the available device fields, retain the field-level errors for display, and show unavailable nullable fields (such as `imsi` or `policy`) as unavailable rather than blanking the whole detail panel.

## Remaining work

- Implement the specified typed query and mutation hooks, shared in-flight request cache, TTL, and `queryKey` cancellation/reset behavior.
- Prevent prior-tenant data from rendering during a tenant switch.
- Add IMEI search, state filtering, server-driven list pagination, and independently paginated device history.
- Add independent loading, error, and empty states for list, detail, and history.
- Implement available-action lookup and optimistic lock with rollback, targeted detail/history updates, and user-visible mutation errors.
- Add one deterministic hook test for stale-response ordering or rollback.


## UI  - Completed work
<img src="../alps-console-2/public/UI-Screen.png">