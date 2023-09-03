import mongoose, { ConnectOptions } from "mongoose";
import { discoverService } from "./AWSDiscovery";

export let safeDB: mongoose.Connection | null = null;

const mongoSetup = async () => {
  console.log("Trying to connect safemain mongodb...");

  const mongoIp = await discoverService("us-east-1", {
    NamespaceName: "tst",
    ServiceName: "mongo",
    MaxResults: 10,
  });

  safeDB = await mongoose.createConnection(
    `mongodb://${mongoIp}:27017/failean-tst?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions
  );

  safeDB.on("error", console.error.bind(console, "connection error:"));
  safeDB.once("open", function () {
    // we're connected!
    console.log("safe main DB connected successfully");
  });
};

export default mongoSetup;
