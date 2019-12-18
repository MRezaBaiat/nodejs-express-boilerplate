import UsersController from '../controllers/UsersController';

const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
  res.sendStatus(200);
});

export default router;
