const contribution = require('../src/contribution');

const username = 'jamieweavis';

test('fetch contribution data via callback', done => {
  contribution(username, data => {
    expect(data).toHaveProperty('streak');
    expect(typeof data.streak).toBe('number');
    expect(data).toHaveProperty('contributions');
    expect(typeof data.contributions).toBe('number');
    done();
  });
});

test('fetch contribution data via promise', done => {
  contribution(username).then(data => {
    expect(data).toHaveProperty('streak');
    expect(typeof data.streak).toBe('number');
    expect(data).toHaveProperty('contributions');
    expect(typeof data.contributions).toBe('number');
    done();
  });
});

test('fetch contribution data via async/await', async done => {
  const data = await contribution(username);
  expect(data).toHaveProperty('streak');
  expect(typeof data.streak).toBe('number');
  expect(data).toHaveProperty('contributions');
  expect(typeof data.contributions).toBe('number');
  done();
});
