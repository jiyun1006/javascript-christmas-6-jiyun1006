import { MissionUtils, Console } from '@woowacourse/mission-utils';
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

  printMenu(menu) {
    Console.print(uiConstants.ORDER_MENU);
    menu.forEach((value, key) => {
      Console.print(`${key} ${value}${uiConstants.COUNT}`);
    });
    Console.print('\n');
  },

  printTotalCost(totalCost) {
    Console.print(uiConstants.TOTAL_COST);
    Console.print(`${totalCost.toLocaleString()}${uiConstants.MONEY_UNIT}`);
    Console.print('\n');
  },

  printFreeGift(isGift) {
    Console.print(uiConstants.FREE_GIFT_MENU);
    if (isGift)
      return Console.print(
        `${uiConstants.FREE_GIFT} ${magicNumber.FREE_GIFT_CNT}${uiConstants.COUNT}\n`,
      );
    return Console.print(`${uiConstants.NOTING}\n`);
  },

  printEventDetail(eventList, type, discountTotal) {
    Console.print(uiConstants.EVENT_DETAIL);
    const eventListValues = Object.values(eventList);
    eventListValues.forEach((value, idx) => {
      if (value)
        Console.print(
          `${type[idx]}-${discountTotal[idx].toLocaleString()}${
            uiConstants.MONEY_UNIT
          }`,
        );
    });
    Console.print('\n');
  },

  printTotalEventCost(totalEventCost) {
    Console.print(uiConstants.TOTAL_EVENT_COST);
    Console.print(
      `-${totalEventCost.toLocaleString()}${uiConstants.MONEY_UNIT}`,
    );
    Console.print('\n');
  },

  printExpectCost(expectationCost) {
    Console.print(uiConstants.EXPECTATION_COST);
    Console.print(
      `${expectationCost.toLocaleString()}${uiConstants.MONEY_UNIT}`,
    );
    Console.print('\n');
  },

  printBadge(badge) {
    Console.print(uiConstants.BADGE);
    Console.print(badge);
  },

  printError() {
    Console.print('ERROR');
  },
};

export default OutputView;
