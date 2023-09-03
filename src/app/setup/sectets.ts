import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";
import { defaultProvider } from "@aws-sdk/credential-provider-node";

const secret_name = "tst/secrets";

const client = new SecretsManagerClient({
  region: "us-east-1",
  credentials: defaultProvider(),
});

export const getSecrets = async () => {
  try {
    const data = await client.send(
      new GetSecretValueCommand({
        SecretId: secret_name,
        VersionStage: "AWSCURRENT",
      })
    );
    return JSON.parse(data.SecretString || "");
  } catch (err) {
    console.error("Error during getting secrets:", err.message);
    throw err;
  }
};
