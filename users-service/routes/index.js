import UsersController from "../controllers/UsersController";
import express from 'express';
import ValidatorMiddleware from "../middlewares/validator-middleware";
import AsyncWrapper from "../helpers/AsyncWrapper";
import NotFoundError from "../errors/not-found-error";
const graphqlHTTP = require('express-graphql');
const passport = require("passport");

const router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/signup', [ValidatorMiddleware(UsersController.validators.signup)],AsyncWrapper(async(req, res, next)=>{
  const token = await UsersController.create(req.body);
  res.send(token);
}));

router.post('/signin',[ValidatorMiddleware(UsersController.validators.signin)],AsyncWrapper(async (req,res,next)=>{
  const user = req.body;
  const token = await UsersController.signIn(user.email,user.password);
  if(!token){
    throw new NotFoundError('User not found');
  }
  res.writeHead(200,{Authorization:token}).end('Welcome!');
}));

router.get('/signup/google',passport.authenticate('google', { scope: ['profile','email'] }));
router.get('/signup/google/callback',passport.authenticate('google', { failureRedirect: '/api/users/signup'}),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/api/users/');
    });

router.use('/graphql',graphqlHTTP({
  schema: require('../models/users/GraphQL').schema,
  rootValue: require('../models/users/GraphQL').resolver,
  graphiql: true
}));

export default router;
