const contribution = require('./index')

test('fetch via callback', done => {
  const callback = data => {
    expect(data).toHaveProperty('streak')
    expect(typeof data.streak).toBe('number')
    expect(data).toHaveProperty('contributions')
    expect(typeof data.contributions).toBe('number')
    done()
  }
  contribution('jamiestraw', callback)
})

test('fetch via promise', done => {
  contribution('jamiestraw')
    .then((data) => {
      expect(data).toHaveProperty('streak')
      expect(typeof data.streak).toBe('number')
      expect(data).toHaveProperty('contributions')
      expect(typeof data.contributions).toBe('number')
      done()
    })
})

test('fetch via async', (done) => {
  async function foo () {
    const data = await contribution('jamiestraw')
    expect(data).toHaveProperty('streak')
    expect(typeof data.streak).toBe('number')
    expect(data).toHaveProperty('contributions')
    expect(typeof data.contributions).toBe('number')
    done()
  }
  foo()
})
