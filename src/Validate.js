import { error, magicNumber } from './constants/index.js';

export default class Validate {
  // 숫자인지 아닌지
  isNumber(obj) {
    if (isNaN(obj)) throw new Error(error.WRONG_NUMBER);
  }

  // 숫자가 조건에 맞는지 (1~31), 0인지 아닌지도 검사가 된다.
  isInRange(num) {
    if (num < magicNumber.FIRST_DAY && num > magicNumber.END_DAY)
      throw new Error(error.WRONG_NUMBER);
  }

  // 공백인지 아닌지 체크
  isEmpty(obj) {
    const regExp = /\s/;
    if (!obj || regExp.test(obj)) throw new Error(error.NOT_EMPTY);
  }
}
