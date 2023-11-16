import { error, uiConstants } from '../src/constants/index.js';
import { validateExcute } from '../src/utils/index.js';

describe('메뉴 입력시 테스트', () => {
  test.each([['레드와인-1,제로콜라-3'], ['샴페인-1']])(
    '음료만 주문 하면 오류 발생',
    (input) => {
      expect(() => {
        validateExcute(input, uiConstants.MENU);
      }).toThrow(error.NOT_ONLY_BEVERAGE);
    },
  );

  test.each([
    ['초코케이크-5,티본스테이크-8,제로콜라-4,타파스-5'],
    ['티본스테이크-30'],
  ])('메뉴 주문 개수가 20개 넘어가면 오류 발생', (input) => {
    expect(() => {
      validateExcute(input, uiConstants.MENU);
    }).toThrow(error.UP_TO_TWENTY);
  });

  test.each([['초코케이크-5,티본스테이크-7,김치볶음밥-3'], ['라면-3,김치-5']])(
    '메뉴판에 없는 메뉴면 오류 발생',
    (input) => {
      expect(() => {
        validateExcute(input, uiConstants.MENU);
      }).toThrow(error.WRONG_MENU);
    },
  );

  test.each([['레드와인-0,티본스테이크-1'], ['타파스-a']])(
    '메뉴 숫자가 1이상의 숫자가 아닐 때 오류발생',
    (input) => {
      expect(() => {
        validateExcute(input, uiConstants.MENU);
      }).toThrow(error.WRONG_MENU);
    },
  );

  test.each([
    ['레드와인-1.타파스-3'],
    ['티본스테이크.2-초코케이크-.1'],
    ['제로콜라3,바비큐립1'],
  ])('주문의 형태가 올바르지 않으면 오류 발생', (input) => {
    expect(() => {
      validateExcute(input, uiConstants.MENU);
    }).toThrow(error.WRONG_MENU);
  });

  test.each([
    ['티본스테이크-1,티본스테이크-3'],
    ['타파스-3,티본스테이크-3,바비큐립-3,타파스-4'],
  ])('중복되는 메뉴주문이 있으면 오류 발생', (input) => {
    expect(() => {
      validateExcute(input, uiConstants.MENU);
    }).toThrow(error.WRONG_MENU);
  });
});
