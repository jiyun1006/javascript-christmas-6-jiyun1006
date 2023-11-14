import { error, magicNumber, uiConstants } from './constants/index.js';

export default class Validate {
  excute(obj, type) {
    switch (type) {
      case uiConstants.DATE:
        this.#dateValidate(obj);
        break;
      case uiConstants.MENU:
        // this.#menu = obj;
        break;
    }
  }

  #dateValidate(obj) {
    this.#isNumber(obj);
    this.#isEmpty(obj);
    this.#isInRange(obj);
  }

  #menuValidate(obj) {}

  // --------------
  // 유효성 검사 메서드모음
  // 숫자인지 아닌지
  #isNumber(obj) {
    if (isNaN(obj)) throw new Error(error.WRONG_DATE);
  }

  // 공백인지 아닌지 체크
  #isEmpty(obj) {
    const regExp = /\s/;
    if (!obj || regExp.test(obj)) throw new Error(error.WRONG_DATE);
  }

  // 숫자가 조건에 맞는지 (1~31), 0인지 아닌지도 검사가 된다.
  #isInRange(num) {
    if (num < magicNumber.FIRST_DAY || num > magicNumber.END_DAY)
      throw new Error(error.WRONG_DATE);
  }
}
