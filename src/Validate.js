import {
  error,
  magicNumber,
  uiConstants,
  food,
  menuBoard,
} from './constants/index.js';
import { createMapObj } from './utils/index.js';

export default class Validate {
  excute(obj, type) {
    switch (type) {
      case uiConstants.DATE:
        this.#dateValidate(obj);
        break;
      case uiConstants.MENU:
        this.#menuValidate(obj);
        break;
    }
  }

  #dateValidate(obj) {
    this.#isEmpty(obj);
    this.#isNumber(obj);
    this.#isInRange(obj);
  }

  #menuValidate(obj) {
    this.#isGoodForm(obj);
    this.#isInMenuBoard(obj);
    this.#isNotSameMenu(obj);
    this.#isMenuCntNumber(obj);
    this.#isOnlyBeverage(obj);
    this.#upToTwenty(obj);
  }

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

  // 음료만 주문 x
  #isOnlyBeverage(menu) {
    const menuObj = createMapObj(menu);
    const menuLen = menuObj.size;
    let beverageCnt = 0;
    menuObj.forEach((value, key) => {
      if (food.BEVERAGE.includes(key)) beverageCnt += 1;
    });
    if (menuLen === beverageCnt) throw new Error(error.NOT_ONLY_BEVERAGE);
  }

  // 메뉴 개수는 20개이하로
  #upToTwenty(menu) {
    const menuObj = createMapObj(menu);
    let menuCnt = 0;
    menuObj.forEach((value, key) => {
      menuCnt += value;
    });
    if (menuCnt > magicNumber.MENU_MAX_CNT) throw new Error(error.UP_TO_TWENTY);
  }

  // 메뉴판에 없는 메뉴 x
  #isInMenuBoard(menu) {
    const menuObj = createMapObj(menu);
    menuObj.forEach((value, key) => {
      if (!menuBoard.includes(key)) throw new Error(error.WRONG_MENU);
    });
  }

  // 메뉴 개수가 1이상의 숫자인지.
  #isMenuCntNumber(menu) {
    const menuObj = createMapObj(menu);
    menuObj.forEach((value, key) => {
      if (isNaN(value) || value < magicNumber.MENU_MIN_CNT)
        throw new Error(error.WRONG_MENU);
    });
  }

  // 입력이 올바른 형태로 받아지는지
  #isGoodForm(menuStr) {
    const menuArr = menuStr.split(',');
    const regExp = /^[가-힣]{1,}[-]{1}[0-9]{1,}$/;
    if (!menuArr.every((menu) => regExp.test(menu)))
      throw new Error(error.WRONG_MENU);
  }

  // 중복 메뉴 x
  #isNotSameMenu(menuStr) {
    const menuArr = menuStr.split(',');
    let before = [];
    menuArr.forEach((menu) => {
      const tmp = menu.split('-');
      if (before.includes(tmp[magicNumber.BEFORE]))
        throw new Error(error.WRONG_MENU);
      before.push(tmp[magicNumber.BEFORE]);
    });
  }
}
