import { magicNumber, foodCost } from '../constants/index.js';
import { createFoodObj } from '../utils/index.js';

export default class Planner {
  #menuObj;

  #totalCost;

  constructor(menu) {
    this.#menuObj = this.#createMenuObj(menu);
    this.#totalCost = this.#createTotalCost(this.#menuObj);
  }

  #createMenuObj(menuStr) {
    const menuArr = menuStr.split(',');
    const menuObj = new Map();
    menuArr.forEach((menu) => {
      const tmp = menu.split('-');
      menuObj.set(tmp[0], Number(tmp[1]));
    });
    return menuObj;
  }

  #createTotalCost(menu) {
    let totalCost = 0;
    const foodObj = createFoodObj();
    menu.forEach((value, key) => {
      totalCost += foodCost[key] * value;
    });
    return totalCost;
  }

  // 할인 종류별로 구현한 메서드

  // 1. 크리스마스 디데이 할인
  #discountDday(date) {
    return magicNumber.DDAY_DISCOUNT + magicNumber.DISCOUNT_UNIT * (date - 1);
  }

  // 2. 평일할인(일~목) : 디저트메뉴 2023원 할인
  #discountWeekDay(date) {}

  // 3. 주말할인(금,토) : 메인메뉴 2023원 할인
  #discountWeekEnd(date) {}

  // 4. 특별할인 : 별 표시 있는 날짜에 1000원 할인
  #discountSpecial(date) {}

  // 증정 이벤트 (할인 전 금액 12만원 이상이면)
  #giveFreegift() {}
}
