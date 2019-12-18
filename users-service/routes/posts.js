import PostsController from '../controllers/PostsController';
import AsyncWrapper from '../helpers/AsyncWrapper';
import BadRequestError from '../errors/badrequest-error';
import ValidatorMiddleware from '../middlewares/validator-middleware';
import InternalServerError from '../errors/internal-server-error';

const express = require('express');
const router = express.Router();

router.get('/:userid', AsyncWrapper(async (req, res) => {
  const userId = req.params.userid;
  if (!userId) {
    throw new BadRequestError('you need to provide userid param in url request');
  }
  const posts = await PostsController.findAllOfUser(userId);
  res.send(posts);
}));

router.post('/', ValidatorMiddleware(PostsController.validators.create), AsyncWrapper(async (req, res) => {
  const post = req.body;
  if (!await PostsController.create(post, req.userId)) {
    throw new InternalServerError();
  }
  res.sendStatus(200);
}));

export default router;
