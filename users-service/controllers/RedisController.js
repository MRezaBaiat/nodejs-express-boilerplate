/*choco install redis-64*/
import type {UserModelInterface} from "../models/users/DBModel";

const redis = require('redis');
const promisify = require('util').promisify;

class RedisController{

    constructor(redisConfig) {
        this.key = redisConfig.key;
        this.host = redisConfig.host;
        this.port = redisConfig.port;
        this.password = redisConfig.password;
        this.redisClient = redis.createClient({
            host:this.host,
            port:this.port,
            auth_pass:this.password,
        })
    }

    async getUser(userId: string){
        return promisify(this.redisClient.hget).bind(this.redisClient)(getUserKey(userId),this.key)
    }

    async purgeCache(userId: string){
        return promisify(this.redisClient.expire).bind(this.redisClient)(getUserKey(userId),0)
    }

    async storeUser(user: UserModelInterface){
        await this.purgeCache(user.userId);
        await promisify(this.redisClient.hset).bind(this.redisClient)(getUserKey(user.userId),this.key,JSON.stringify(user))
    }
}

function getUserKey(userId: string){
    return `user#${userId}`;
}

export default new RedisController({
    key:'users',
    host:process.env.REDIS_HOST,
    port:process.env.REDIS_PORT,
    password:process.env.REDIS_PASSWORD
})
