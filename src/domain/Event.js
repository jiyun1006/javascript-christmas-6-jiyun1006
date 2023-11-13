import {
  food,
  foodCost,
  specialDay,
  magicNumber,
  uiConstants,
} from '../constants/index.js';
import { OutputView } from '../utils/index.js';

// 혜택 확인하고 계산하는 클래스
export default class Event {
  #eventList;

  #menuObj;

  #totalCost;

  constructor(date, menu) {
    this.#menuObj = this.#createMenuObj(menu);
    this.#totalCost = this.#createTotalCost(this.#menuObj);

    this.#eventList = this.#fillBoolean(false);
    if (this.#checkTotalAmount(this.#totalCost)) {
      this.#eventList = this.#checkEvent(date, this.#totalCost);
    }
  }

  // 문자열인 주문목록을 Map 객체로 변환
  #createMenuObj(menuStr) {
    const menuArr = menuStr.split(',');
    const menuObj = new Map();
    menuArr.forEach((menu) => {
      const tmp = menu.split('-');
      menuObj.set(tmp[0], Number(tmp[1]));
    });
    return menuObj;
  }

  //  총 비용 계산
  #createTotalCost(menu) {
    let totalCost = 0;
    menu.forEach((value, key) => {
      totalCost += foodCost[key] * value;
    });
    return totalCost;
  }

  // -------------------
  // 이벤트 혜택 체크하는 부분.
  #checkTotalAmount(total) {
    if (total >= magicNumber.MIN_COST) return true;
    return false;
  }

  #fillBoolean(bool) {
    const eventCheck = [];
    eventCheck.Dday = bool;
    eventCheck.WeekDay = bool;
    eventCheck.WeekEnd = bool;
    eventCheck.Special = bool;
    eventCheck.FreeGift = bool;
    return eventCheck;
  }

  // 혜택 확인하는 메서드
  #checkEvent(date, total) {
    const eventCheck = [];
    eventCheck.Dday = this.#checkDiscountDday(date);
    eventCheck.WeekDay = this.#checkDiscountWeekDay(date);
    eventCheck.WeekEnd = this.#checkDiscountWeekEnd(date);
    eventCheck.Special = this.#checkDiscountSpecial(date);
    eventCheck.FreeGift = this.#checkFreeGift(total);
    return eventCheck;
  }

  #checkDiscountDday(date) {
    return !!(date >= magicNumber.EVENT_START && date <= magicNumber.EVENT_END);
  }

  #checkDiscountWeekDay(date) {
    return !!(date % magicNumber.WEEK !== 1 && date % magicNumber.WEEK !== 2);
  }

  #checkDiscountWeekEnd(date) {
    return !!(date % magicNumber.WEEK === 1 || date % magicNumber.WEEK === 2);
  }

  #checkDiscountSpecial(date) {
    return !!specialDay.includes(date);
  }

  #checkFreeGift(total) {
    return !!(total >= magicNumber.GIFT_COST);
  }

  // -------------------
  // 혜택 확인 후 할인 적용하는 메서드

  // 외부로 이용할 메서드
  discountTotal(date) {
    let [ddayDC, weekDayDC, weekEndDC, specialDC] = [0, 0, 0, 0];
    if (this.#eventList.Dday) {
      ddayDC = this.#discountDday(date);
    }
    if (this.#eventList.WeekDay) {
      weekDayDC = this.#discountWeekDay(this.#menuObj);
    }
    if (this.#eventList.WeekEnd) {
      weekEndDC = this.#discountWeekEnd(this.#menuObj);
    }
    if (this.#eventList.Special) {
      specialDC = this.#discountSpecial();
    }
    return [ddayDC, weekDayDC, weekEndDC, specialDC];
  }

  // 1. 크리스마스 디데이 할인
  #discountDday(date) {
    return magicNumber.DDAY_DISCOUNT + magicNumber.DISCOUNT_UNIT * (date - 1);
  }

  // 2. 평일할인(일~목) : 디저트메뉴 2023원 할인
  #discountWeekDay(menu) {
    let discountCost = 0;
    menu.forEach((value, key) => {
      if (food.DESSERT.includes(key))
        discountCost += magicNumber.DESSERT_DISCOUNT;
    });
    return discountCost;
  }

  // 3. 주말할인(금,토) : 메인메뉴 2023원 할인
  #discountWeekEnd(menu) {
    let discountCost = 0;
    menu.forEach((value, key) => {
      if (food.MAIN.includes(key)) discountCost += magicNumber.MAIN_DISCOUNT;
    });
    return discountCost;
  }

  // 4. 특별할인 : 별 표시 있는 날짜에 1000원 할인
  #discountSpecial() {
    return magicNumber.SPECIAL_DISCOUNT;
  }

  // -------------------
  // 출력 메서드들 이용(외부 이용)
  printOrderMenu() {
    OutputView.printMenu(this.#menuObj);
  }

  printTotal() {
    OutputView.printTotalCost(this.#totalCost);
  }

  printGift() {
    OutputView.printFreeGift(this.#eventList.FreeGift);
  }

  printDiscountDetail(discountTotal) {
    const type = [
      uiConstants.DDAY_DISCOUNT,
      uiConstants.WEEKDAY_DISCOUNT,
      uiConstants.WEEKEND_DISCOUNT,
      uiConstants.SPECIAL_DISCOUNT,
      uiConstants.FREE_GIFT_EVENT_DISCOUNT,
    ];
    OutputView.printEventDetail(this.#eventList, type, discountTotal);
  }
}
