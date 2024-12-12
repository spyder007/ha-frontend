import createConfig from "@spydersoft/react-runtime-config";

export const { useConfig: useApiConfig, getConfig: getApiConfig } = createConfig({
  namespace: "ha_client",
  schema: {
    unifi: {
      type: "string",
      description: "Url Segment for Data",
      default: "/api/unifi",
    },
    bff: {
      type: "string",
      description: "HA Frontend Url",
      default: "",
    },
  },
});
