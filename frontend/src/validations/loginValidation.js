import { isValidEmail, isValidPassword } from './validation';
import { Errors, PasswordErrors } from '../consts/consts';

export const loginValidation = (form) => {
  const { email, password } = form;

  return {
    email: isValidEmail(email) ? null : Errors.EMAIL,
    password: isValidPassword(password)
      ? null
      : PasswordErrors.INVALID_PASSWORD,
  };
};
