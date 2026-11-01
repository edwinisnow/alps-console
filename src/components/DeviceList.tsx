function DeviceList({
  loading,
  error,
  listOfDevices,
  selectedDeviceID,
  setSelectedDeviceID,
  onLock,
}: any) {
  const result = loading ? (
    <tr>
      <td className="px-6 py-5 text-center">Loading...</td>
    </tr>
  ) : error ? (
    <tr>
      <td className="px-6 py-5 text-center text-red-500">
        Error: {error.message}
      </td>
    </tr>
  ) : listOfDevices.length === 0 ? (
    <tr>
      <td className="px-6 py-5 text-center">No devices found.</td>
    </tr>
  ) : null;

  if (result) {
    return (
      <table className="flex">
        <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600 dark:bg-gray-900 dark:text-gray-300">
          <tr className="border-b border-gray-300 dark:border-gray-600">
            <th className="px-6 py-5 font-semibold">Serial Number</th>
            <th className="px-6 py-5 font-semibold">IMEI</th>
            <th className="px-6 py-5 font-semibold">Model</th>
            <th className="px-6 py-5 font-semibold">State</th>
            <th className="px-6 py-5 font-semibold">Last Check-in</th>
            <th className="px-6 py-5 font-semibold">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {result}
        </tbody>
      </table>
    );
  }
  return (
    <table className="flexrounded-lg border border-gray-300 bg-white p-4 shadow-sm dark:bg-gray-800  dark:text-white">
      <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600 dark:bg-gray-900 dark:text-gray-300">
        <tr className="border-b border-gray-300 dark:border-gray-600">
          <th className="px-6 py-5 font-semibold">Serial Number</th>
          <th className="px-6 py-5 font-semibold">IMEI</th>
          <th className="px-6 py-5 font-semibold">Model</th>
          <th className="px-6 py-5 font-semibold">State</th>
          <th className="px-6 py-5 font-semibold">Last Check-in</th>
          <th className="px-6 py-5 font-semibold">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {listOfDevices.map((device: any) => (
          <tr
            key={device.serialNumber}
            className={`cursor-pointer transition-colors hover:bg-blue-50 dark:hover:bg-gray-700 ${
              selectedDeviceID === device.id
                ? "bg-blue-100 dark:bg-gray-600"
                : ""
            }`}
            onClick={() => {
              // console.log(device.id);
              setSelectedDeviceID(device.id);
            }}
          >
            <td className="whitespace-nowrap px-6 py-5 font-medium text-gray-900 dark:text-white">
              {device.serialNumber}
            </td>
            <td className="whitespace-nowrap px-6 py-5 text-gray-600 dark:text-gray-300">
              {device.IMEIs?.[0]?.imei}
            </td>
            <td className="whitespace-nowrap px-6 py-5">
              {device.modelMarketingName}
            </td>

            <td className="whitespace-nowrap px-6 py-5">
              {device.state?.name}
            </td>
            <td className="whitespace-nowrap px-6 py-5">
              {device.lastCheckin}
            </td>
            <td className="whitespace-nowrap px-6 py-5">
              <button
                className={`rounded px-4 py-2 text-white ${
                  device.state?.name === "LOCKED"
                    ? "cursor-not-allowed bg-gray-400"
                    : "cursor-pointer bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={device.state?.name === "LOCKED"}
                onClick={(e) => {
                  e.stopPropagation();
                  onLock(device);
                }}
              >
                Lock
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DeviceList;
