export const DELAY = 250;

export const LIST_DEVICES_QUERY = `
  query ListDevices(
    $tenantId: String
    $imei: String
    $serialNumber: String
    $stateId: Int
    $page: Int
    $pageSize: Int
  ) {
    listDevices(
      tenantId: $tenantId
      imei: $imei
      serialNumber: $serialNumber
      stateId: $stateId
      page: $page
      pageSize: $pageSize
    ) {
      pageInfo {
        total_count
      }
      deviceList {
        id
        serialNumber
        modelMarketingName
        brandName
        IMEIs {
          imei
          isPrimary
        }
        state {
          id
          name
        }
        lastCheckin
      }
    }
  }
`;

export const DEVICE_DETAIL_QUERY = `
query DeviceDetail($tenantId: String!, $deviceId: String!) {
  deviceDetail(tenantId: $tenantId, deviceId: $deviceId) {
    id
    serialNumber
    deviceBrandName
    deviceModelMarketingName
    imsi
    locale
    firstEnrollAt
    IMEIs {
      imei
      isPrimary
    }
    state {
      id
      name
    }
    policy {
      id
      name
      color
    }
    lastCheckin {
      label
      date
      color
    }
  }
}
`;

export const LOCK_DEVICE_MUTATION = `
  mutation AssignAction(
    $tenantId: String!
    $deviceId: String!
    $actionId: String!
  ) {
    assignAction(
      tenantId: $tenantId
      deviceId: $deviceId
      actionId: $actionId
    )
  }
`;
