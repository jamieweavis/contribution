import { fetchStats } from './index';

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

describe('contribution', (): void => {
  describe('the fetchStats function', (): void => {
    describe('when provided with a valid username', (): void => {
      it('should execute the success callback with contribution data', (done): void => {
        fetchStats(validUsername, {
          onSuccess: (stats): void => {
            expect(stats).toEqual(expect.objectContaining(responseShape));
            done();
          },
        });
      });

      it('should resolve a promise with contribution data', (done): void => {
        fetchStats(validUsername).then((data): void => {
          expect(data).toEqual(expect.objectContaining(responseShape));
          done();
        });
      });

      it('should await with contribution data', async (done): Promise<void> => {
        const data = await fetchStats(validUsername);
        expect(data).toEqual(expect.objectContaining(responseShape));
        done();
      });
    });

    describe('when provided with an invalid username', (): void => {
      it('should execute the failure callback with error message', (done): void => {
        fetchStats(invalidUsername, {
          onFailure: (error): void => {
            expect(error).toEqual(expect.objectContaining(errorShape));
            done();
          },
        });
      });

      it('should catch the promise rejection with error message', (done): void => {
        fetchStats(invalidUsername).catch((error): void => {
          expect(error).toEqual(expect.objectContaining(errorShape));
          done();
        });
      });

      it('should catch the error with error message', async (done): Promise<
        void
      > => {
        try {
          await fetchStats(invalidUsername);
        } catch (error) {
          expect(error).toEqual(expect.objectContaining(errorShape));
          done();
        }
      });
    });
  });
});
