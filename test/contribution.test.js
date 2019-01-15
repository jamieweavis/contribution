import contribution from '../lib/index.min';

const validUsername = 'jamieweavis';
const invalidUsername = 'veryveryveryveryveryverylonginvalidusername';

const exampleData = {
  currentStreak: expect.any(Number),
  bestStreak: expect.any(Number),
  contributions: expect.any(Number),
  bestDay: expect.any(Number),
  currentDay: expect.any(Number),
};
const exampleError = {
  statusCode: expect.any(Number),
};

test('fetch contribution data via callback', done => {
  contribution(validUsername, {
    onSuccess: data => {
      expect(data).toEqual(expect.objectContaining(exampleData));
      done();
    },
  });
});

test('fetch contribution data via promise', done => {
  contribution(validUsername).then(data => {
    expect(data).toEqual(expect.objectContaining(exampleData));
    done();
  });
});

test('fetch contribution data via async/await', async done => {
  const data = await contribution(validUsername);
  expect(data).toEqual(expect.objectContaining(exampleData));
  done();
});

test('fetch contribution data f invalid user via callback', done => {
  contribution(invalidUsername, {
    onFailure: error => {
      expect(error).toEqual(expect.objectContaining(exampleError));
      done();
    },
  });
});

test('fetch contribution data for invalid user via promise', done => {
  contribution(invalidUsername).catch(error => {
    expect(error).toEqual(expect.objectContaining(exampleError));
    done();
  });
});

test('fetch contribution data for invalid user via async/await', async done => {
  try {
    await contribution(invalidUsername);
  } catch (error) {
    expect(error).toEqual(expect.objectContaining(exampleError));
    done();
  }
});
