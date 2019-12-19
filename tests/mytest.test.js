const request = require('supertest');
const server = require('../users-service/bin/www');
import { ErrorCodes } from '../users-service/constants';

describe('Post Endpoints', () => {
  it('testing routes', async (done) => {
    let res = await request(server).get('/');
    expect(res.statusCode).toEqual(200);
    res = await request(server).post('/api/users/');
    expect(res.statusCode).toEqual(ErrorCodes.FORBIDDEN);
    res = await request(server).get('/api/users/csrf_unsafe');
    const cookies = res.headers['set-cookie'].map((value) => value.split(' Path=/')[0]).join(' ').trim();
    const xsrfToken = global.getCookieValue(res.headers['set-cookie'], 'XSRF-TOKEN');
    expect(xsrfToken).not.toBeNull();
    res = await request(server).post('/api/users/').set('XSRF-TOKEN', xsrfToken).set('cookie', cookies);
    expect(res.statusCode).toEqual(ErrorCodes.UNAUTHORIZED);
    res = await request(server).post('/signin').set('XSRF-TOKEN', xsrfToken).set('cookie', cookies).send({ email: 'Untouchable.rb@gmail.com', password: '1234' });
    expect(res.statusCode).toEqual(200);
    const authorization = res.headers.authorization;
    expect(authorization).not.toBeNull();
    res = await request(server).post('/api/users/').set('authorization', 'Bearer ' + authorization).set('XSRF-TOKEN', xsrfToken).set('cookie', cookies);
    expect(res.statusCode).toEqual(404);

    done();
  });
});
