const contribution = require('../src/contribution');

const username = 'jamieweavis';
const invalidUsername = 'hkwwezhsgyczzvjjktvvmneqxzidwupkyhtotanh';

test('fetch contribution data via callback without CORS', done => {
  contribution(username, {
    callback: data => {
      expect(data).toHaveProperty('currentStreak');
      expect(typeof data.currentStreak).toBe('number');
      expect(data).toHaveProperty('bestStreak');
      expect(typeof data.bestStreak).toBe('number');
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
      expect(data).toHaveProperty('currentStreak');
      expect(typeof data.currentStreak).toBe('number');
      expect(data).toHaveProperty('bestStreak');
      expect(typeof data.bestStreak).toBe('number');
      expect(data).toHaveProperty('contributions');
      expect(typeof data.contributions).toBe('number');
      done();
    }
  });
});

test('fetch contribution data via promise without CORS', done => {
  contribution(username).then(data => {
    expect(data).toHaveProperty('currentStreak');
    expect(typeof data.currentStreak).toBe('number');
    expect(data).toHaveProperty('bestStreak');
    expect(typeof data.bestStreak).toBe('number');
    expect(data).toHaveProperty('contributions');
    expect(typeof data.contributions).toBe('number');
    done();
  });
});

test('fetch contribution data via promise with CORS', done => {
  contribution(username, { enableCors: true }).then(data => {
    expect(data).toHaveProperty('currentStreak');
    expect(typeof data.currentStreak).toBe('number');
    expect(data).toHaveProperty('bestStreak');
    expect(typeof data.bestStreak).toBe('number');
    expect(data).toHaveProperty('contributions');
    expect(typeof data.contributions).toBe('number');
    done();
  });
});

test('fetch contribution data via async/await without CORS', async done => {
  const data = await contribution(username);
  expect(data).toHaveProperty('currentStreak');
  expect(typeof data.currentStreak).toBe('number');
  expect(data).toHaveProperty('bestStreak');
  expect(typeof data.bestStreak).toBe('number');
  expect(data).toHaveProperty('contributions');
  expect(typeof data.contributions).toBe('number');
  done();
});

test('fetch contribution data via async/await with CORS', async done => {
  const data = await contribution(username, { enableCors: true });
  expect(data).toHaveProperty('currentStreak');
  expect(typeof data.currentStreak).toBe('number');
  expect(data).toHaveProperty('bestStreak');
  expect(typeof data.bestStreak).toBe('number');
  expect(data).toHaveProperty('contributions');
  expect(typeof data.contributions).toBe('number');
  done();
});

test('fetch contribution data for unknown user via callback without CORS', done => {
  contribution(invalidUsername, {
    onFailure: error => {
      expect(typeof error).toBe('object');
      expect(error).toHaveProperty('statusCode');
      expect(typeof error.statusCode).toBe('number');
      expect(error.statusCode).toEqual(404);
      done();
    }
  })
});

test('fetch contribution data for unknown user via promise without CORS', done => {
  contribution(invalidUsername)
  .catch(error => {
    expect(typeof error).toBe('object');
    expect(error).toHaveProperty('statusCode');
    expect(typeof error.statusCode).toBe('number');
    expect(error.statusCode).toEqual(404);
    done();
  })
});

test('fetch contribution data for unknown user via async/await without CORS', async done => {
  try {
    await contribution(invalidUsername);
  } catch (error) {
    expect(typeof error).toBe('object');
    expect(error).toHaveProperty('statusCode');
    expect(typeof error.statusCode).toBe('number');
    expect(error.statusCode).toEqual(404);
    done();
  }
});
