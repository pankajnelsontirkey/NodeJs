const request = require('supertest');

const app = require('../src/app');
const User = require('../src/models/user');
const { userOne, userOneId, seedDatabase, userTwo } = require('./fixtures/db');
beforeEach(seedDatabase);

test('Should sign up a new user.', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      name: 'pankajnelsontirkey',
      email: 'pankajnelsontirkey@mail.com',
      password: 'pankajnelsontirkey'
    })
    .expect(201);

  /* Assert that the database was update with new user */
  const user = await User.findById(response.body.user._id);
  expect(user).not.toBeNull();

  expect(response.body).toMatchObject({
    user: {
      name: 'pankajnelsontirkey',
      email: 'pankajnelsontirkey@mail.com'
    },
    token: user.tokens[0].token
  });

  expect(user.password).not.toBe('pankajnelsontirkey');
});

test('Should login existing user.', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should fail to login unregistered user', async () => {
  await request(app)
    .post('/users/login')
    .send({
      email: 'failLogin@mail.com',
      password: 'failLogin'
    })
    .expect(400);
});

test('Should get profile for user.', async () => {
  await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
});

test('Should not get profile for unauthenticated user.', async () => {
  await request(app)
    .get('/users/me')
    .send()
    .expect(401);
});

test('Should delete account for user.', async () => {
  await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200);

  const user = await User.findById(userOne._id);
  expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user.', async () => {
  await request(app)
    .delete('/users/me')
    .send()
    .expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/users/me/avatar')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/avatar_male.jpg')
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ name: 'updatedUserOneName' })
    .expect(200);

  const user = await User.findById(userOneId);
  expect(user.name).toEqual('updatedUserOneName');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send({ location: 'updatedUserOneLocation' })
    .expect(400);
});
