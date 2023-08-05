import { ServiceDiscovery } from "@aws-sdk/client-servicediscovery";
import dotenv from "dotenv";
dotenv.config();

export const discoverService = async (
  region: string,
  params: any
): Promise<string> => {
  if (process.env.NODE_ENV === "development") return "127.0.0.1";
  const serviceDiscovery = new ServiceDiscovery({ region });
  try {
    const data = await serviceDiscovery.discoverInstances(params);
    return (
      (data.Instances && data.Instances[0].Attributes?.AWS_INSTANCE_IPV4) + ""
    );
  } catch (err) {
    console.error("Error during service discovery:", err.message);
    throw err; // Rethrow the error to be handled by the caller
  }
};
