import Validate from '../Validate.js';
import { uiConstants } from '../constants/index.js';

const validateExcute = (input, type) => {
  const validate = new Validate();
  validate.excute(input, type);
};

export default validateExcute;
