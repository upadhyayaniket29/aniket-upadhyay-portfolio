import { Logger } from "../utils/logger";

interface CacheEntry {
  value: any;
  expiresAt: number;
}

class CacheService {
  private inMemoryCache = new Map<string, CacheEntry>();
  private isRedis = false;
  private redisClient: any = null;

  constructor() {
    this.initializeCache();
  }

  private async initializeCache() {
    const redisUrl = process.env.REDIS_URL;
    if (redisUrl) {
      try {
        // Dynamic load of redis package to prevent startup crashes if not installed
        const redis = require("redis");
        this.redisClient = redis.createClient({ url: redisUrl });
        
        this.redisClient.on("error", (err: any) => {
          Logger.error("Redis Client Error:", err);
          this.isRedis = false;
        });

        await this.redisClient.connect();
        Logger.info("Successfully connected to Redis cache database.");
        this.isRedis = true;
      } catch (err) {
        Logger.warn("Failed to connect to Redis, reverting to in-memory fallback:", err);
        this.isRedis = false;
      }
    } else {
      Logger.info("No REDIS_URL defined. Using local in-memory cache.");
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (this.isRedis && this.redisClient) {
      try {
        const data = await this.redisClient.get(key);
        return data ? JSON.parse(data) : null;
      } catch (err) {
        Logger.error(`Redis GET error for key ${key}:`, err);
      }
    }

    // In-Memory Fallback
    const entry = this.inMemoryCache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expiresAt) {
      this.inMemoryCache.delete(key);
      return null;
    }

    return entry.value as T;
  }

  async set(key: string, value: any, ttlSeconds: number): Promise<void> {
    if (this.isRedis && this.redisClient) {
      try {
        await this.redisClient.set(key, JSON.stringify(value), {
          EX: ttlSeconds,
        });
        return;
      } catch (err) {
        Logger.error(`Redis SET error for key ${key}:`, err);
      }
    }

    // In-Memory Fallback
    const expiresAt = Date.now() + ttlSeconds * 1000;
    this.inMemoryCache.set(key, { value, expiresAt });
  }

  async del(key: string): Promise<void> {
    if (this.isRedis && this.redisClient) {
      try {
        await this.redisClient.del(key);
        return;
      } catch (err) {
        Logger.error(`Redis DEL error for key ${key}:`, err);
      }
    }

    this.inMemoryCache.delete(key);
  }
}

export const Cache = new CacheService();
export default Cache;
