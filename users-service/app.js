import NotFoundError from './errors/not-found-error';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import postsRouter from './routes/posts';
import {
  csurfMiddleware,
  csrfProtectionMiddleware,
  authenticationMiddleware,
  protectedRoute
} from './middlewares';

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieSession = require('@authentication/cookie-session');// more secure than cookie-session of express
const logger = require('morgan');

import { errorLogger, errorsHandler } from './middlewares/errorhandler-middleware';
const helmet = require('helmet');

const app = express();

app.use(authenticationMiddleware);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// only signup and index page do not require csrf protection
app.use('/api/users', indexRouter);

app.use(csurfMiddleware);
if (process.env.NODE_ENV === 'production') {
  app.use(csrfProtectionMiddleware);// enable this in production ,one of things it does is it prevents access to server from postman , sniffer , etc... by comparing origin,referer and host
}
app.get('/api/users/csrf_unsafe', (req, res, next) => { // include csrf token in this route
  req.csrfToken && res.cookie('XSRF-TOKEN', req.csrfToken());
  res.status(200).end();
});

app.all('*', function (req, res, next) {
  // if you want to include csrf token on all (like in SPA)
  req.csrfToken && res.cookie('XSRF-TOKEN', req.csrfToken());
  next();
});

app.use(protectedRoute);
app.use(
  cookieSession({
    name: 'session',
    maxAge: '30 days'
  })
);
app.use((req, res, next) => {
  req.userId = req.user;
  next();
});

app.use('/api/users', usersRouter);
app.use('/api/posts', postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  throw new NotFoundError();
});

// error handler
app.use(errorLogger());
app.use(errorsHandler());

module.exports = app;
