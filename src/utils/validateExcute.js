import Validate from '../Validate.js';

const validateExcute = (input, type) => {
  const validate = new Validate();
  validate.excute(input, type);
};

export default validateExcute;
