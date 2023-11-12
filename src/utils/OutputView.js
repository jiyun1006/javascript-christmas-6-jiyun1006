import { MissionUtils, Console } from '@woowacourse/mission-utils';
import { uiConstants } from '../constants/index.js';

export default OutputView = {
  printMenu() {
    Console.print(uiConstants.ORDER_MENU);
  },

  printGreeting() {
    Console.print(uiConstants.GREETING_MESSAGE);
  },

  printPreviewEvent() {
    Console.print(uiConstants.PREVIEW_EVENT_MESSAGE);
  },
};
