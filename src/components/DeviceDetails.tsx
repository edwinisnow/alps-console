function DeviceDetails({ deviceDetails }: { deviceDetails: any }) {
  return (
    <aside className="rounded-lg border border-gray-300 bg-white shadow-sm dark:bg-gray-800  dark:text-white">
      {deviceDetails ? (
        <div className="p-4">
          <h2 className="mb-2 text-lg font-semibold">Device Details</h2>
          <p>
            <strong>Serial Number:</strong> {deviceDetails.serialNumber}
          </p>
          <p>
            <strong>IMEI:</strong> {deviceDetails.IMEIs?.[0]?.imei}
          </p>
          <p>
            <strong>Model:</strong> {deviceDetails.deviceModelMarketingName}
          </p>
          <p>
            <strong>Brand:</strong> {deviceDetails.deviceBrandName}
          </p>
          <p>
            <strong>Policy:</strong> {deviceDetails.policy?.name}
          </p>
          <p>
            <strong>Service Type:</strong> {deviceDetails.serviceType?.label}
          </p>
          <p>
            <strong>State:</strong> {deviceDetails.state?.name}
          </p>
          <p>
            <strong>Last Check-in:</strong> {deviceDetails.lastCheckin?.date}
          </p>
          <p>
            <strong>Last Changed:</strong> {deviceDetails.lastChanged}
          </p>
        </div>
      ) : (
        <div>Select a device to see details</div>
      )}
    </aside>
  );
}

export default DeviceDetails;
