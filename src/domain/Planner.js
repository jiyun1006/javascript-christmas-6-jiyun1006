import { OutputView } from '../view/index.js';
import { uiConstants, magicNumber } from '../constants/index.js';

export default class Planner {
  // -------------------
  // 출력 메서드들 이용(외부 이용)

  // 1. 주문메뉴
  outputOrderMenu(menu) {
    OutputView.printOrderMenuMessage();
    menu.forEach((value, key) => {
      OutputView.printOrderMenu(value, key);
    });
    OutputView.printNewLine();
  }

  // 할인 전 총주문 금액
  outputTotalCost(total) {
    OutputView.printTotalCostMessage();
    OutputView.printTotalCost(total);
    OutputView.printNewLine();
  }

  // 증정메뉴
  outputFreeGift(eventList) {
    OutputView.printFreeGiftMessage();
    if (eventList.FreeGift) return OutputView.printFreeGift();
    return OutputView.printNotFreeGift();
  }

  // 혜택 내역
  outputDiscountDetail(discountTotal, eventList) {
    const [type, eventListValues] = this.#createVariable(eventList);
    OutputView.printDiscountDetailMessage();
    let cnt = 0;
    eventListValues.forEach((value, key) => {
      if (!value) cnt += 1;
      if (value) OutputView.printDiscountDetail(type, discountTotal, key);
    });
    if (cnt === eventListValues.length) OutputView.printDiscountDetailNothing();
    OutputView.printNewLine();
  }

  #createVariable(eventList) {
    const type = [
      uiConstants.DDAY_DISCOUNT,
      uiConstants.WEEKDAY_DISCOUNT,
      uiConstants.WEEKEND_DISCOUNT,
      uiConstants.SPECIAL_DISCOUNT,
      uiConstants.FREE_GIFT_EVENT_DISCOUNT,
    ];
    const eventListValues = Object.values(eventList);
    return [type, eventListValues];
  }

  // 총혜택금액
  outputTotalEventCost(discountTotal) {
    OutputView.printTotalEventCostMessage();
    const sum = this.#sumDiscount(discountTotal);
    if (sum === 0) return OutputView.printTotalEventCostNoting();
    return OutputView.printTotalEventCost(sum);
  }

  #sumDiscount(discountTotal) {
    return discountTotal.reduce((tmpSum, current) => tmpSum + current);
  }

  // 할인후 예상 결제 금액
  outputExpectationCost(discountTotal, total) {
    OutputView.printExpectationCostMessage();
    const sum = this.#sumDiscount(discountTotal);
    OutputView.printExpectationCost(total - sum);
    OutputView.printNewLine();
  }

  // 12월 이벤트 배지
  outputBadge(discountTotal) {
    OutputView.printBadgeMessage();
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
