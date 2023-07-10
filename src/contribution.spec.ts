import { fetchStats } from './contribution';

const validUsername = 'jamieweavis';
const invalidUsername = 'veryveryveryveryveryverylonginvalidusername';

const responseShape = {
  streak: {
    best: expect.any(Number),
    current: expect.any(Number),
    isAtRisk: expect.any(Boolean),
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
  describe('fetchStats', () => {
    describe('when provided with a valid username', () => {
      it('should execute the success callback with contribution stats', (done) => {
        fetchStats(validUsername, {
          onSuccess: (stats) => {
            expect(stats).toEqual(expect.objectContaining(responseShape));
            done();
          },
        });
      });

      it('should resolve a promise with contribution stats', (done) => {
        fetchStats(validUsername).then((stats) => {
          expect(stats).toEqual(expect.objectContaining(responseShape));
          done();
        });
      });

      it('should await with contribution stats', async () => {
        const stats = await fetchStats(validUsername);
        expect(stats).toEqual(expect.objectContaining(responseShape));
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

      it('should catch the error with error message', async () => {
        try {
          await fetchStats(invalidUsername);
        } catch (error) {
          expect(error).toEqual(expect.objectContaining(errorShape));
        }
      });
    });

    describe('when called twice', () => {
      it('should return the same value twice (be idempotent)', async () => {
        const first = await fetchStats(validUsername);
        const second = await fetchStats(validUsername);
        expect(first).toEqual(expect.objectContaining(responseShape));
        expect(second).toEqual(expect.objectContaining(responseShape));
      });
    });
  });
});
