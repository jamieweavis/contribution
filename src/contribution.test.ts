import contribution from './contribution';

const validUsername = 'jamieweavis';
const invalidUsername = 'veryveryveryveryveryverylonginvalidusername';

const exampleData = {
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
const exampleError = {
  statusCode: expect.any(Number),
};

describe('the contribution instance', (): void => {
  describe('when provided with a valid username', (): void => {
    it('should execute the success callback with contribution data', (done): void => {
      contribution(validUsername, {
        onSuccess: (data): void => {
          expect(data).toEqual(expect.objectContaining(exampleData));
          done();
        },
      });
    });

    it('should resolve a promise with contribution data', (done): void => {
      contribution(validUsername).then((data): void => {
        expect(data).toEqual(expect.objectContaining(exampleData));
        done();
      });
    });

    it('should await with contribution data', async (done): Promise<void> => {
      const data = await contribution(validUsername);
      expect(data).toEqual(expect.objectContaining(exampleData));
      done();
    });
  });

  describe('when provided with an invalid username', (): void => {
    it('should execute the failure callback with error message', (done): void => {
      contribution(invalidUsername, {
        onFailure: (error): void => {
          expect(error).toEqual(expect.objectContaining(exampleError));
          done();
        },
      });
    });

    it('should catch the promise rejection with error message', (done): void => {
      contribution(invalidUsername).catch((error): void => {
        expect(error).toEqual(expect.objectContaining(exampleError));
        done();
      });
    });

    it('should catch the error with error message', async (done): Promise<
      void
    > => {
      try {
        await contribution(invalidUsername);
      } catch (error) {
        expect(error).toEqual(expect.objectContaining(exampleError));
        done();
      }
    });
  });
});
