import { MissionUtils, Console } from '@woowacourse/mission-utils';
import { uiConstants } from '../constants/index.js';

const OutputView = {
  printMenu() {
    Console.print(uiConstants.ORDER_MENU);
  },

  printGreeting() {
    Console.print(uiConstants.GREETING_MESSAGE);
  },

  printPreviewEvent(date) {
    Console.print(
      `${uiConstants.DECEMBER}${date}${uiConstants.PREVIEW_EVENT_MESSAGE}`,
    );
  },

  printError() {
    Console.print('ERROR');
  },
};

export default OutputView;
