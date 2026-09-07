import mongoose from "mongoose";
import dns from "dns";

// Fix querySrv ECONNREFUSED error on Windows / local ISP DNS when resolving mongodb+srv://
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // Ignore in environments where setting DNS servers is restricted
}

const DEFAULT_ATLAS_URI = "mongodb+srv://saifulislam3412883:Saiful123abc@cluster0.o0z9upq.mongodb.net/portfolio";

function getMongoUri(): string {
  const envUri = (process.env.MONGODB_URI || "").trim().replace(/^["']|["']$/g, "");
  if (envUri && (envUri.startsWith("mongodb://") || envUri.startsWith("mongodb+srv://"))) {
    return envUri;
  }
  return DEFAULT_ATLAS_URI;
}

const MONGODB_URI = getMongoUri();

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

let cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    const targetUri = getMongoUri();

    cached.promise = mongoose.connect(targetUri, opts).then((m) => {
      console.log("✅ Connected to MongoDB Atlas successfully");
      return m;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB connection error:", e);
    throw e;
  }

  return cached.conn;
}
