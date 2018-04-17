const contribution = require('../src/contribution');

const username = 'jamieweavis';

test('fetch contribution data via callback without CORS', done => {
  contribution(username, {
    callback: data => {
      expect(data).toHaveProperty('streak');
      expect(typeof data.streak).toBe('number');
      expect(data).toHaveProperty('contributions');
      expect(typeof data.contributions).toBe('number');
      done();
    }
  });
});

test('fetch contribution data via callback with CORS', done => {
  contribution(username, {
    enableCors: true,
    callback: data => {
      expect(data).toHaveProperty('streak');
      expect(typeof data.streak).toBe('number');
      expect(data).toHaveProperty('contributions');
      expect(typeof data.contributions).toBe('number');
      done();
    }
  });
});

test('fetch contribution data via promise without CORS', done => {
  contribution(username).then(data => {
    expect(data).toHaveProperty('streak');
    expect(typeof data.streak).toBe('number');
    expect(data).toHaveProperty('contributions');
    expect(typeof data.contributions).toBe('number');
    done();
  });
});

test('fetch contribution data via promise with CORS', done => {
  contribution(username, { enableCors: true }).then(data => {
    expect(data).toHaveProperty('streak');
    expect(typeof data.streak).toBe('number');
    expect(data).toHaveProperty('contributions');
    expect(typeof data.contributions).toBe('number');
    done();
  });
});

test('fetch contribution data via async/await without CORS', async done => {
  const data = await contribution(username);
  expect(data).toHaveProperty('streak');
  expect(typeof data.streak).toBe('number');
  expect(data).toHaveProperty('contributions');
  expect(typeof data.contributions).toBe('number');
  done();
});

test('fetch contribution data via async/await with CORS', async done => {
  const data = await contribution(username, { enableCors: true });
  expect(data).toHaveProperty('streak');
  expect(typeof data.streak).toBe('number');
  expect(data).toHaveProperty('contributions');
  expect(typeof data.contributions).toBe('number');
  done();
});
