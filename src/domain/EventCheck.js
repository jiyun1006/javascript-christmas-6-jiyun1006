import {
  food,
  foodCost,
  specialDay,
  magicNumber,
  uiConstants,
} from '../constants/index.js';
import { OutputView, createMapObj, createTotalCost } from '../utils/index.js';

// 혜택 확인하는 클래스
export default class EventCheck {
  #eventList;

  #menuObj;

  constructor(date, menu) {
    this.#menuObj = createMapObj(menu);
    const totalCost = createTotalCost(this.#menuObj);
    this.#eventList = this.#fillBoolean(false);
    if (this.#checkTotalAmount(totalCost)) {
      this.#eventList = this.#checkEvent(date, totalCost);
    }
  }

  // getter 하나사용.......
  get() {
    return [this.#eventList, this.#menuObj];
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
    let [ddayDC, weekDayDC, weekEndDC, specialDC, giftDC] = Array.from(
      { length: 5 },
      () => 0,
    );
    ddayDC = this.#discountDday(date);
    weekDayDC = this.#discountWeekDay(this.#menuObj);
    weekEndDC = this.#discountWeekEnd(this.#menuObj);
    specialDC = this.#discountSpecial();
    giftDC = this.#eventList.FreeGift ? magicNumber.CHAMPAGNE_COST : 0;
    return [ddayDC, weekDayDC, weekEndDC, specialDC, giftDC];
  }

  // 1. 크리스마스 디데이 할인
  #discountDday(date) {
    return this.#eventList.Dday
      ? magicNumber.DDAY_DISCOUNT + magicNumber.DISCOUNT_UNIT * (date - 1)
      : 0;
  }

  // 2. 평일할인(일~목) : 디저트메뉴 2023원 할인
  #discountWeekDay(menu) {
    let discountCost = 0;
    menu.forEach((value, key) => {
      if (food.DESSERT.includes(key))
        discountCost += magicNumber.DESSERT_DISCOUNT * value;
    });
    return this.#eventList.WeekDay ? discountCost : 0;
  }

  // 3. 주말할인(금,토) : 메인메뉴 2023원 할인
  #discountWeekEnd(menu) {
    let discountCost = 0;
    menu.forEach((value, key) => {
      if (food.MAIN.includes(key))
        discountCost += magicNumber.MAIN_DISCOUNT * value;
    });
    return this.#eventList.WeekEnd ? discountCost : 0;
  }

  // 4. 특별할인 : 별 표시 있는 날짜에 1000원 할인
  #discountSpecial() {
    return this.#eventList.Special ? magicNumber.SPECIAL_DISCOUNT : 0;
  }

  // -------------------
  // 출력 메서드들 이용(외부 이용)

  // 1. 주문메뉴
  printOrderMenu() {
    OutputView.printMenu(this.#menuObj);
  }

  // 할인 전 총주문 금액
  printTotal() {
    const totalCost = createTotalCost(this.#menuObj);
    OutputView.printTotalCost(totalCost);
  }

  // 증정메뉴
  printGift() {
    OutputView.printFreeGift(this.#eventList.FreeGift);
  }

  // 혜택 내역
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

  // 총혜택금액
  printEventCost(discountTotal) {
    const sum = this.#sumDiscount(discountTotal);
    OutputView.printTotalEventCost(sum);
  }

  #sumDiscount(discountTotal) {
    return discountTotal.reduce((tmpSum, current) => tmpSum + current);
  }

  // 할인후 예상 결제 금액
  printExpectaion(discountTotal) {
    const sum = this.#sumDiscount(discountTotal);
    const totalCost = createTotalCost(this.#menuObj);

    OutputView.printExpectCost(totalCost - sum);
  }

  // 12월 이벤트 배지
  printBadge(discountTotal) {
    const sum = this.#sumDiscount(discountTotal);
    OutputView.printBadge(this.#checkBadge(sum));
  }

  #checkBadge(totalEventCost) {
    if (totalEventCost >= magicNumber.SANTA_COST) return uiConstants.SANTA;
    if (totalEventCost >= magicNumber.TREE) return uiConstants.TREE;
    if (totalEventCost >= magicNumber.STAR) return uiConstants.STAR;
    return uiConstants.NOTING;
  }
}
