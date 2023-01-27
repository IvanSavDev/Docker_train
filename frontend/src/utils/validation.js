import { REG_EMAIL, REG_PASSWORD } from '../consts/consts';

export const isValidFullName = (name) => name.length >= 3;
export const isValidCompanyName = (name) => name.length >= 1;
export const isValidEmail = (email) => {
  const isSpace = email.split(' ');
  if (isSpace.length > 1) {
    return false;
  }
  return REG_EMAIL.test(email);
};
export const isValidPassword = (password) => REG_PASSWORD.test(password);
export const isMatchPassword = (password, repeatedPassword) =>
  password === repeatedPassword;

export const isInvalidAccount = (errors) => {
  if (errors.invalidAccount) {
    return Boolean(errors.email || errors.password);
  }
  return true;
};

export const isPositiveInteger = (number) =>
  Number.isInteger(number) && number >= 0;
