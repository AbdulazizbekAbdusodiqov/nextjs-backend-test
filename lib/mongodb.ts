import mongoose from 'mongoose';

const MONGODB_URI = process.env.NEXT_PUBLIC_MONGO_URI!;

if (!MONGODB_URI) throw new Error("Mongo URI .env faylda yo'q ");

let cached = (global as any).mongoose || { conn: null, promise: null };

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
