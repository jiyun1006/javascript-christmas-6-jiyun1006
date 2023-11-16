import { uiConstants } from '../constants/index.js';
import { retry } from '../utils/index.js';

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
