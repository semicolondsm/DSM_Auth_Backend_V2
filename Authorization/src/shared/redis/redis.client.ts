import "dotenv/config";
import * as redis from "redis";
import { promisify } from "util";

const redisClient: redis.RedisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
  password: process.env.REDIS_PASSWORD,
});

const asyncFuncRedisGet = promisify(redisClient.get).bind(redisClient);
const asyncFuncRedisSet = promisify(redisClient.set).bind(redisClient);
const asyncFuncRedisDel = promisify(redisClient.del).bind(redisClient);

export default redisClient;
export { asyncFuncRedisGet, asyncFuncRedisSet, asyncFuncRedisDel };
