import type { PostModelInterface } from '../models/posts/DBModel';
import db from '../databases/mysql/PostsDB';
import validators from '../models/posts/Validators';

const create = async (post: PostModelInterface, senderId: string) => {
  post.senderId = senderId;
  return db.create(post);
};

const findAllOfUser = async (userid: number) => {
  return db.findAllOfUser({ userid });
};

export default {
  create,
  findAllOfUser,
  validators
};
