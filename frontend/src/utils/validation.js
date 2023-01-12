import { REG_EMAIL, REG_PASSWORD } from "../consts/consts";

export const isValidFullName = (name) => name.length >= 3;
export const isValidCompanyName = (name) => name.length >= 1;
export const isValidEmail = (email) => REG_EMAIL.test(email);
export const isValidPassword = (password) => REG_PASSWORD.test(password);
export const isMatchPassword = (password, repeatedPassword) =>
  password === repeatedPassword;
