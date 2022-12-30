import { getDataFromLocalStorage } from "./localStorage";
import { KeysLocalStorage } from "../consts/consts";

export const isEmptyProperties = (object) => {
  return Object.keys(object).some((key) => object[key].length === 0);
};

export const isEmptyObject = (object) => Object.keys(object).length === 0;

export const checkExistsAccountByEmail = (email) => {
  const accounts = getDataFromLocalStorage(KeysLocalStorage.accounts);
  if (accounts) {
    const account = Object.values(accounts).find(
      (account) => account.email === email
    );
    return Boolean(account);
  } else {
    return null;
  }
};

export const getAccountByEmailAndPassword = (email, password) => {
  const accounts = getDataFromLocalStorage(KeysLocalStorage.accounts);
  if (accounts) {
    const accountFromLocalStorage = Object.values(accounts).find(
      (account) => account.email === email && account.password === password
    );
    return accountFromLocalStorage;
  } else {
    return null;
  }
};

export const checkNewEmailOnValidation = (oldEmail, newEmail) => {
  if (oldEmail === newEmail) {
    return false;
  }
  return checkExistsAccountByEmail(newEmail);
};

export const isDifferencesWithOldAccount = (oldAccount, newAccount) => {
  return Object.keys(oldAccount).every(
    (key) => oldAccount[key] === newAccount[key]
  );
};

export const haveErrors = (errors) =>
  Object.values(errors).every((error) => !error);

export const capitalizeFirstLetter = (string) =>
  string[0].toUpperCase() + string.slice(1);

export const generateId = () => Date.now();

export const getFormatDate = (dateForFormat) => {
  const dateInMilliseconds = dateForFormat
    ? new Date(dateForFormat)
    : new Date();
  let day = dateInMilliseconds.getDate();
  console.log(day);
  if (String(day).length === 1) {
    day = `0${day}`;
  }
  let month = dateInMilliseconds.getMonth();
  if (String(month).length === 1) {
    month = `0${month}`;
  }
  const year = dateInMilliseconds.getFullYear();
  return `${day}.${month}.${year}`;
};
