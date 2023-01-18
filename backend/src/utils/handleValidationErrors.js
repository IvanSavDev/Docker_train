import { validationResult } from 'express-validator';

export default (req, res, next) => {
  const myValidationResult = validationResult.withDefaults({
    formatter: (error) => {
      return {
        message: error.msg,
        parameter: error.param,
        value: error.value,
      };
    },
  });
  const errors = myValidationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  next();
};
