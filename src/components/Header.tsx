import type { TenantId } from "../types";

function Header({
  tenantId,
  setTenantId,
}: {
  tenantId: string;
  setTenantId: (value: string) => void;
}) {
  return (
    <header className="bg-blue-900 p-4">
      <h1>ALPS Device Dashboard</h1>
      <div className="text-right">
        <label htmlFor="tenant-select">Select: </label>
        <select
          id="tenant-select"
          name="tenant-select"
          value={tenantId}
          onChange={(e) => setTenantId(e.target.value as TenantId)}
        >
          <option value="tenant-alpha">Tenant Alpha</option>
          <option value="tenant-beta">Tenant Beta</option>
        </select>
      </div>
    </header>
  );
}

export default Header;
