import { MissionUtils, Console } from '@woowacourse/mission-utils';
import { uiConstants } from '../constants/index.js';

export default InputView = {
  async readDate() {
    const input = await Console.readLineAsync(uiConstants.WHEN_VISIT_MESSAGE);
    return input;
  },

  async orderMenu() {
    const input = await Console.readLineAsync(uiConstants.ORDER_MENU_MESSAGE);
    return input;
  },
};
