import {
  isValidCompanyName,
  isValidEmail,
  isValidFullName,
  isValidPassword,
} from './validation';
import { Errors, PasswordErrors } from '../consts/consts';

export const userValidation = (form) => {
  const { name, surname, companyName, email, oldPassword, newPassword } = form;

  const checkOldPasswordErrors = () => {
    if (oldPassword.length === 0) {
      return newPassword.length === 0 ? null : PasswordErrors.OLD_PASSWORD;
    }
    if (!isValidPassword(oldPassword)) {
      return PasswordErrors.INVALID_PASSWORD;
    }
    return newPassword !== oldPassword ? null : PasswordErrors.SAME_PASSWORD;
  };

  const checkNewPasswordErrors = () => {
    if (newPassword.length === 0) {
      return oldPassword.length === 0 ? null : PasswordErrors.NEW_PASSWORD;
    }
    if (!isValidPassword(newPassword)) {
      return PasswordErrors.INVALID_PASSWORD;
    }
    return newPassword !== oldPassword ? null : PasswordErrors.SAME_PASSWORD;
  };

  return {
    name: isValidFullName(name) ? null : Errors.FULL_NAME,
    surname: isValidFullName(surname) ? null : Errors.FULL_NAME,
    companyName: isValidCompanyName(companyName) ? null : Errors.COMPANY_NAME,
    email: isValidEmail(email) ? null : Errors.EMAIL,
    oldPassword: checkOldPasswordErrors(),
    newPassword: checkNewPasswordErrors(),
  };
};
