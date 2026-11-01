import { useState } from "react";
import { TenantProvider } from "./data/graphql";
import DeviceContainer from "./components/DeviceContainer";
import type { TenantId } from "./types";

function App() {
  const [tenantId, setTenantId] = useState<TenantId>("tenant-alpha");
  return (
    <TenantProvider tenantId={tenantId}>
      <DeviceContainer tenantId={tenantId} setTenantId={setTenantId} />
    </TenantProvider>
  );
}

export default App;
