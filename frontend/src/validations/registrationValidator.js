import {
  isMatchPassword,
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from './validation';
import { Errors, PasswordErrors } from '../consts/consts';

export const registrationValidator = (form) => {
  const { name, surname, companyName, email, password, confirmPassword } = form;

  return {
    name: isValidFullName(name) ? null : Errors.FULL_NAME,
    surname: isValidFullName(surname) ? null : Errors.FULL_NAME,
    companyName: isValidCompanyName(companyName) ? null : Errors.COMPANY_NAME,
    email: isValidEmail(email) ? null : Errors.EMAIL,
    password: isValidPassword(password)
      ? null
      : PasswordErrors.INVALID_PASSWORD,
    confirmPassword: isMatchPassword(password, confirmPassword)
      ? null
      : PasswordErrors.MATCH_PASSWORD,
  };
};
