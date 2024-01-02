import request from 'supertest';
import { app } from '../app';

describe('SignUp', () => {
  it('Should returns a 201 on successful signup', async () => {
    return request(app)
      .post('/api/users/signup')
      .send({ email: 'test@test.com', password: 'password' })
      .expect(201);
  });

  it('Should returns a 400 with an invalid email', async () => {
    return request(app)
          .post('/api/users/signup')
      .send({ email: 'testgmailcom', password: 'password' })
      .expect(400);
  })
});
