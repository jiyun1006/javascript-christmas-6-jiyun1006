import { Console } from '@woowacourse/mission-utils';
import { uiConstants } from '../constants/index.js';
import { OutputView } from './index.js';
import Validate from '../Validate.js';

const retry = {
  async createInput(type) {
    let result = null;

    try {
      result = await this.createType(type);
      new Validate(result, type);
    } catch (error) {
      OutputView.printError(error.message);
      result = await this.createInput(type);
    }
    return result;
  },

  async createType(type) {
    let result = null;
    switch (type) {
      case uiConstants.DATE:
        result = await Console.readLineAsync(uiConstants.WHEN_VISIT_MESSAGE);
        break;
      case uiConstants.MENU:
        result = await Console.readLineAsync(uiConstants.ORDER_MENU_MESSAGE);
        break;
    }
    return result;
  },
};

const InputView = {
  async readDate() {
    const input = await retry.createInput(uiConstants.DATE);
    return input;
  },

  async orderMenu() {
    const input = await retry.createInput(uiConstants.MENU);
    return input;
  },
};

export default InputView;
