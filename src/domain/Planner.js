import { createTotalCost, OutputView } from '../utils/index.js';
import { EventCheck } from './index.js';
import { uiConstants, magicNumber } from '../constants/index.js';

export default class Planner {
  // -------------------
  // 출력 메서드들 이용(외부 이용)

  // 1. 주문메뉴
  outputOrderMenu(menu) {
    OutputView.printMenu(menu);
  }

  // 할인 전 총주문 금액
  outputTotalCost(total) {
    OutputView.printTotalCost(total);
  }

  // 증정메뉴
  outputFreeGift(eventList) {
    OutputView.printFreeGift(eventList.FreeGift);
  }

  // 혜택 내역
  outputDiscountDetail(discountTotal, eventList) {
    const type = [
      uiConstants.DDAY_DISCOUNT,
      uiConstants.WEEKDAY_DISCOUNT,
      uiConstants.WEEKEND_DISCOUNT,
      uiConstants.SPECIAL_DISCOUNT,
      uiConstants.FREE_GIFT_EVENT_DISCOUNT,
    ];
    OutputView.printEventDetail(eventList, type, discountTotal);
  }

  // 총혜택금액
  outputTotalEventCost(discountTotal) {
    const sum = this.#sumDiscount(discountTotal);
    OutputView.printTotalEventCost(sum);
  }

  #sumDiscount(discountTotal) {
    return discountTotal.reduce((tmpSum, current) => tmpSum + current);
  }

  // 할인후 예상 결제 금액
  outputExpectaion(discountTotal, total) {
    const sum = this.#sumDiscount(discountTotal);
    OutputView.printExpectCost(total - sum);
  }

  // 12월 이벤트 배지
  outputBadge(discountTotal) {
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
