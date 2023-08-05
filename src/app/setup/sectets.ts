import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "tst/secrets";

const client = new SecretsManagerClient({
  region: "us-east-1",
});

export const getSecrets = async () => {
  return JSON.parse(
    (
      await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
      )
    ).SecretString || ""
  );
};
