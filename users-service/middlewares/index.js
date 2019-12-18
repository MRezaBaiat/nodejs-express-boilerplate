import csrfProtection from '@authentication/csrf-protection';
import csurf from 'csurf';
import authentication from './authentication-middleware';
import protectedRouteMiddleware from './protected-route';

const csurfMiddleware = csurf({ cookie: true });
const csrfProtectionMiddleware = csrfProtection();
const authenticationMiddleware = authentication;
const protectedRoute = protectedRouteMiddleware();

export {
  csrfProtectionMiddleware,
  csurfMiddleware,
  authenticationMiddleware,
  protectedRoute
};

export default (middlewares: {auth?: boolean, validator: any}): [] => {
  const array = [];
  if (middlewares.auth) {
    // array.push(authenticationMiddleware);
  }
  if (middlewares.validator) {
    array.push(middlewares.validator);
  }
  return array;
};
