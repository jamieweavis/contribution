import { fetchStats } from './contribution';

const validUsername = 'jamieweavis';
const invalidUsername = 'veryveryveryveryveryverylonginvalidusername';

const responseShape = {
  streak: {
    best: expect.any(Number),
    current: expect.any(Number),
  },
  contributions: {
    best: expect.any(Number),
    current: expect.any(Number),
    total: expect.any(Number),
  },
};
const errorShape = {
  statusCode: expect.any(Number),
};

describe('contribution', () => {
  describe('the fetchStats function', () => {
    describe('when provided with a valid username', () => {
      it('should execute the success callback with contribution data', (done) => {
        fetchStats(validUsername, {
          onSuccess: (stats) => {
            expect(stats).toEqual(expect.objectContaining(responseShape));
            done();
          },
        });
      });

      it('should resolve a promise with contribution data', (done) => {
        fetchStats(validUsername).then((data) => {
          expect(data).toEqual(expect.objectContaining(responseShape));
          done();
        });
      });

      it('should await with contribution data', async (done) => {
        const data = await fetchStats(validUsername);
        expect(data).toEqual(expect.objectContaining(responseShape));
        done();
      });
    });

    describe('when provided with an invalid username', () => {
      it('should execute the failure callback with error message', (done) => {
        fetchStats(invalidUsername, {
          onFailure: (error) => {
            expect(error).toEqual(expect.objectContaining(errorShape));
            done();
          },
        });
      });

      it('should catch the promise rejection with error message', (done) => {
        fetchStats(invalidUsername).catch((error) => {
          expect(error).toEqual(expect.objectContaining(errorShape));
          done();
        });
      });

      it('should catch the error with error message', async (done) => {
        try {
          await fetchStats(invalidUsername);
        } catch (error) {
          expect(error).toEqual(expect.objectContaining(errorShape));
          done();
        }
      });
    });

    describe('when called twice', () => {
      it('should return the same value twice (be idempotent)', async (done) => {
        const first = await fetchStats(validUsername);
        const second = await fetchStats(validUsername);
        expect(first).toEqual(expect.objectContaining(responseShape));
        expect(second).toEqual(expect.objectContaining(responseShape));
        done();
      });
    });
  });
});
