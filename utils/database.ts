import mongoose from "mongoose";

let isConnected = false;

const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }
  const MongoDBURI: string = process.env.MONGODB_URI || "Provide a URI";
  try {
    await mongoose.connect(MongoDBURI);
    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
