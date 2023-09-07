import mongoose, { ConnectOptions } from "mongoose";

export let safeDB: mongoose.Connection | null = null;

const mongoSetup = async () => {
  console.log("Trying to connect safemain mongodb...");



  safeDB = await mongoose.createConnection(
    `mongodb://mongo--is10c2t.internal.bluebeach-0228d74e.australiaeast.azurecontainerapps.io:27017/failean-tst?retryWrites=true&w=majority`,
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
