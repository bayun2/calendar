import calcTime from '../src/helper/calcTime';

describe('calcTime', () => {
  test('next month when month less than 11', () => {
    expect(calcTime('next', 2016, 6)).toEqual({year: 2016, month: 7});
  });

  test('next month when month equal 11', () => {
    expect(calcTime('next', 2016, 11)).toEqual({year: 2017, month: 0});
  });

  test('prev month when month greater than 11', () => {
    expect(calcTime('prev', 2016, 6)).toEqual({year: 2016, month: 5});
  });

  test('prev month when month equal 0', () => {
    expect(calcTime('prev', 2016, 0)).toEqual({year: 2015, month:11});
  });

  test('not prev or next', () => {
    expect(calcTime('cur', 2016, 6)).toEqual({year: 2016, month:6});
  });
});
