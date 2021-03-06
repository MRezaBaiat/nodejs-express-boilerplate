import sequelize from './sequelize';
import DBModel from '../../models/posts/DBModel';

const PostsDB = sequelize.define('posts', DBModel);

// Note: using `force: true` will drop the table if it already exists

export const initialize = () => {
  return PostsDB.sync({ force: false });
};

const create = async (post: DBModel) => {
  return PostsDB.create(post);
};

const findOne = async (condition: {K: string}) => {
  return PostsDB.findOne(condition);
};

const findAllOfUser = async (condition) => {
  return PostsDB.findAll(condition);
};

export default {
  create,
  findOne,
  findAllOfUser
};
