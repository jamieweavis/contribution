const contribution = require('../src/contribution');

const validUsername = 'jamieweavis';
const invalidUsername = 'hkwwezhsgyczzvjjktvvmneqxzidwupkyhtotanh';

test('fetch contribution data via callback', done => {
  contribution(validUsername, {
    onSuccess: data => {
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

test('fetch contribution data via promise', done => {
  contribution(validUsername).then(data => {
    expect(data).toHaveProperty('currentStreak');
    expect(typeof data.currentStreak).toBe('number');
    expect(data).toHaveProperty('bestStreak');
    expect(typeof data.bestStreak).toBe('number');
    expect(data).toHaveProperty('contributions');
    expect(typeof data.contributions).toBe('number');
    done();
  });
});

test('fetch contribution data via async/await', async done => {
  const data = await contribution(validUsername);
  expect(data).toHaveProperty('currentStreak');
  expect(typeof data.currentStreak).toBe('number');
  expect(data).toHaveProperty('bestStreak');
  expect(typeof data.bestStreak).toBe('number');
  expect(data).toHaveProperty('contributions');
  expect(typeof data.contributions).toBe('number');
  done();
});

test('fetch contribution data for invalid user via callback', done => {
  contribution(invalidUsername, {
    onFailure: error => {
      expect(typeof error).toBe('object');
      expect(error).toHaveProperty('statusCode');
      expect(typeof error.statusCode).toBe('number');
      expect(error.statusCode).toEqual(404);
      done();
    }
  });
});

test('fetch contribution data for invalid user via promise', done => {
  contribution(invalidUsername).catch(error => {
    expect(typeof error).toBe('object');
    expect(error).toHaveProperty('statusCode');
    expect(typeof error.statusCode).toBe('number');
    expect(error.statusCode).toEqual(404);
    done();
  });
});

test('fetch contribution data for invalid user via async/await', async done => {
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
