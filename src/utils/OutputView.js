import { MissionUtils, Console } from '@woowacourse/mission-utils';
import { uiConstants } from '../constants/index.js';

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

  printError() {
    Console.print('ERROR');
  },
};

export default OutputView;
