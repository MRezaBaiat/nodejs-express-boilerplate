import db from '../databases/mongo/UsersDB';
import validators from '../models/users/Validators';
import type { UserModelInterface } from '../models/users/DBModel';
import Hasher from '../helpers/Hasher';
import jwt from 'jsonwebtoken';
import RedisController from './RedisController';

const passwordHasher = new Hasher();

async function create (user: UserModelInterface) {
  user.password = await passwordHasher.hash(user.password);
  user = await db.create(user);
  await RedisController.storeUser(user);
  return generateAccessToken(user);
}

async function findByEmail (email: string) {
  return db.findOne({ email });
}

async function findById (userId: string) {
  const user = await RedisController.getUser(userId);
  if (user) {
    return user;
  }
  return db.findOne({ userId });
}

async function deleteUser (userId: string) {
  await RedisController.purgeCache(userId);
  return db.deleteOne(userId);
}

async function signIn (email, password) {
  const user = await findByEmail(email);
  if (!user) {
    return null;
  }
  if (await passwordHasher.check(password, user.password)) {
    return generateAccessToken(user);
  }
  return null;
}

async function generateAccessToken (user) {
  if (!user) {
    throw new Error('Invalid User');
  }
  const userInfo: UserModelInterface = user.toJSON();
  delete userInfo.password;
  const payload = {
    userid: userInfo.userId
  };
  return jwt.sign(payload, process.env.AUTH_SECRET, {
    algorithm: 'HS256',
    issuer: process.env.TOKEN_ISSUER,
    subject: `${user.userId}`
  });
}

export default {
  validators,
  create,
  findByEmail,
  signIn
};
