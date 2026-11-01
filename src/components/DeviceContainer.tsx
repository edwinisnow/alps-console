import { useState } from "react";
import type { TenantId } from "../types";
import {
  LIST_DEVICES_QUERY,
  DEVICE_DETAIL_QUERY,
  LOCK_DEVICE_MUTATION,
  DELAY,
} from "../constants";
import Header from "./Header";
import DeviceList from "./DeviceList";
import DeviceDetails from "./DeviceDetails";
import { useDebouncedSearch } from "../utils/utilities";
import { useTenantQuery } from "../hooks/useTenantQuery";

function DeviceContainer({
  tenantId,
  setTenantId,
}: {
  tenantId: TenantId;
  setTenantId: (value: TenantId) => void;
}) {
  const page = 1;
  const [search, setSearch] = useState("");
  const [selectedDeviceID, setSelectedDeviceID] = useState<string | null>(null);

  const pageSize = 10;

  const debouncedSearch = useDebouncedSearch(search, DELAY);

  const listDevicesQuery = useTenantQuery(LIST_DEVICES_QUERY, {
    variables: {
      search: debouncedSearch,
      serialNumber: debouncedSearch || undefined,
      page,
      pageSize,
    },
  });

  const listOfDevices = listDevicesQuery.data?.listDevices?.deviceList || [];

  const deviceDetailsQuery = useTenantQuery(DEVICE_DETAIL_QUERY, {
    variables: { deviceId: selectedDeviceID ?? "" },
  });

  const deviceDetails =
    deviceDetailsQuery.data?.deviceDetail?.id === selectedDeviceID
      ? deviceDetailsQuery.data.deviceDetail
      : null;

  const lockMutation = useTenantQuery(LOCK_DEVICE_MUTATION, {
    variables: {
      tenantId,
      deviceId: "",
      actionId: "act-lock",
    },
  });

  const handleLock = async (device: any) => {
    await lockMutation.refetch({
      tenantId,
      deviceId: device.id,
      actionId: "act-lock",
    });
    await listDevicesQuery.refetch();

    if (device.id === selectedDeviceID) {
      await deviceDetailsQuery.refetch();
    }
  };
  return (
    <main className="dark:bg-gray-700 dark:text-white min-h-screen">
      <Header
        tenantId={tenantId}
        setTenantId={(value) => {
          setSelectedDeviceID(null);
          setTenantId(value as TenantId);
        }}
      />
      <section className="p-4">
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search by IMEI or serial"
            className="border border-gray-300 rounded px-4 py-2 w-full m"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            type="button"
            onClick={() => listDevicesQuery.refetch()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>
      </section>
      <section className="flex gap-2">
        <DeviceList
          loading={listDevicesQuery.loading}
          error={listDevicesQuery.error}
          listOfDevices={listOfDevices}
          selectedDeviceID={selectedDeviceID}
          onLock={(device: any) => handleLock(device)}
          setSelectedDeviceID={(value: string) => setSelectedDeviceID(value)}
        />

        <DeviceDetails deviceDetails={deviceDetails} />
      </section>
    </main>
  );
}
export default DeviceContainer;
