import mongoose from "mongoose";
import dns from "dns";

// Configure public DNS servers to resolve MongoDB SRV records reliably
try {
  dns.setServers(["8.8.8.8", "1.1.1.1", "8.8.4.4"]);
} catch {
  // Ignore in environments where setting custom DNS is restricted
}

// Direct 3-node MongoDB Atlas replica set URI (bypasses Windows / ISP SRV DNS lookup issues)
const DIRECT_REPLICA_URI =
  "mongodb://saifulislam3412883:Saiful123abc@ac-pgo0shx-shard-00-00.o0z9upq.mongodb.net:27017,ac-pgo0shx-shard-00-01.o0z9upq.mongodb.net:27017,ac-pgo0shx-shard-00-02.o0z9upq.mongodb.net:27017/portfolio?ssl=true&replicaSet=atlas-3ihs4e-shard-0&authSource=admin&retryWrites=true&w=majority";

function getMongoUri(): string {
  const envUri = (process.env.MONGODB_URI || "").trim().replace(/^["']|["']$/g, "");
  if (envUri && (envUri.startsWith("mongodb://") || envUri.startsWith("mongodb+srv://"))) {
    return envUri;
  }
  return DIRECT_REPLICA_URI;
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongooseCache || { conn: null, promise: null };

if (!global.mongooseCache) {
  global.mongooseCache = cached;
}

export async function connectToDatabase(): Promise<typeof mongoose> {
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000,
    };

    const targetUri = getMongoUri();

    cached.promise = mongoose
      .connect(targetUri, opts)
      .then((m) => {
        console.log("✅ Connected to MongoDB Atlas successfully");
        return m;
      })
      .catch(async (err) => {
        // If SRV lookup failed (querySrv ECONNREFUSED), automatically fallback to direct replica set URI
        if (targetUri.startsWith("mongodb+srv://") && String(err).includes("querySrv")) {
          console.warn("⚠️ SRV DNS resolution failed. Retrying with direct MongoDB Atlas replica set URI...");
          return mongoose.connect(DIRECT_REPLICA_URI, opts).then((m) => {
            console.log("✅ Connected to MongoDB Atlas via Direct Replica Set successfully");
            return m;
          });
        }
        throw err;
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
