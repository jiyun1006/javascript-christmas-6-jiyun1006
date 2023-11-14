import { Console } from '@woowacourse/mission-utils';
import { magicNumber, uiConstants } from '../constants/index.js';

const OutputView = {
  printGreeting() {
    Console.print(uiConstants.GREETING_MESSAGE);
  },

  printPreviewEvent(date) {
    Console.print(
      `${uiConstants.DECEMBER}${date}${uiConstants.PREVIEW_EVENT_MESSAGE}\n`,
    );
  },

  printNewLine() {
    Console.print('\n');
  },

  // 주문메뉴 출력 메서드
  printOrderMenuMessage() {
    Console.print(uiConstants.ORDER_MENU);
  },

  printOrderMenu(value, key) {
    Console.print(`${key} ${value}${uiConstants.COUNT}`);
  },

  // 할인 전 총 주문금액 출력 메서드
  printTotalCostMessage() {
    Console.print(uiConstants.TOTAL_COST);
  },

  printTotalCost(totalCost) {
    Console.print(`${totalCost.toLocaleString()}${uiConstants.MONEY_UNIT}`);
  },

  // 증정 메뉴 출력 메서드
  printFreeGiftMessage() {
    Console.print(uiConstants.FREE_GIFT_MENU);
  },

  printFreeGift() {
    Console.print(
      `${uiConstants.FREE_GIFT} ${magicNumber.FREE_GIFT_CNT}${uiConstants.COUNT}\n`,
    );
  },

  printNotFreeGift() {
    Console.print(`${uiConstants.NOTING}\n`);
  },

  // 혜택 내역 출력 메서드
  printDiscountDetailMessage() {
    Console.print(uiConstants.EVENT_DETAIL);
  },

  printDiscountDetail(type, discountTotal, idx) {
    Console.print(
      `${type[idx]}-${discountTotal[idx].toLocaleString()}${
        uiConstants.MONEY_UNIT
      }`,
    );
  },

  printDiscountDetailNothing() {
    Console.print(uiConstants.NOTING);
  },

  // 총 혜택금액 출력 메서드
  printTotalEventCostMessage() {
    Console.print(uiConstants.TOTAL_EVENT_COST);
  },

  printTotalEventCost(totalEventCost) {
    Console.print(
      `-${totalEventCost.toLocaleString()}${uiConstants.MONEY_UNIT}\n`,
    );
  },

  printTotalEventCostNoting() {
    Console.print(`0${uiConstants.MONEY_UNIT}\n`);
  },

  // 할인후 예상 금액 출력 메서드
  printExpectationCostMessage() {
    Console.print(uiConstants.EXPECTATION_COST);
  },

  printExpectationCost(expectationCost) {
    Console.print(
      `${expectationCost.toLocaleString()}${uiConstants.MONEY_UNIT}`,
    );
  },

  // 12월 이벤트 배지 출력 메서드
  printBadgeMessage() {
    Console.print(uiConstants.BADGE);
  },

  printBadge(badge) {
    Console.print(badge);
  },

  printError() {
    Console.print('ERROR');
  },
};

export default OutputView;
