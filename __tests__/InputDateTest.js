import Validate from '../src/Validate.js';
import { error, uiConstants } from '../src/constants/index.js';

describe('날짜 입력에 관한 테스트', () => {
  test.each([['a'], ['A'], ['#']])('숫자가 입력되었는지 테스트', (input) => {
    expect(() => {
      new Validate(input, uiConstants.DATE);
    }).toThrow(error.WRONG_NUMBER);
  });

  test.each([[0], [33], [56]])(
    '범위 내의 숫자가 입력되었는지 테스트(1~31)',
    (input) => {
      expect(() => {
        new Validate(input, uiConstants.DATE);
      }).toThrow(error.WRONG_NUMBER);
    },
  );

  test.each([[''], [' ']])('공백이 입력되었는지 테스트', (input) => {
    expect(() => {
      new Validate(input, uiConstants.DATE);
    }).toThrow(error.WRONG_NUMBER);
  });
});
