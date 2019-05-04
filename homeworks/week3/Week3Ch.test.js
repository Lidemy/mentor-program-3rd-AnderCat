const mult = require('./Week3Ch');

describe('Week3Ch', () => {
  it('should return correct answer when a=34567 and b=56789', () => {
    expect(mult('34567', '56789')).toBe('1963025363');
  });
});
