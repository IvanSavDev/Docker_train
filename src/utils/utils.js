import { getDataFromLocalStorage } from "./localStorage";
import { KeysLocalStorage } from "../consts/consts";

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
  return accounts
    ? Object.values(accounts).find(
        (account) => account.email === email && account.password === password
      )
    : null;
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

export const generateId = () => Date.now() + Math.floor(Math.random() * 100);

export const getFormatDate = (dateForFormat) => {
  const dateInMilliseconds = dateForFormat
    ? new Date(dateForFormat)
    : new Date();
  let day = dateInMilliseconds.getDate();
  if (String(day).length === 1) {
    day = `0${day}`;
  }
  let month = dateInMilliseconds.getMonth() + 1;
  if (String(month).length === 1) {
    month = `0${month}`;
  }
  const year = dateInMilliseconds.getFullYear();
  return `${day}.${month}.${year}`;
};

export const formatNumberWithSpace = (number) => {
  let result = "";
  const numberAsStringArray = String(number).split("");
  for (let i = 1; i <= numberAsStringArray.length; i++) {
    const j = numberAsStringArray.length - i;
    result =
      (!j || i % 3 ? numberAsStringArray[j] : " " + numberAsStringArray[j]) +
      result;
  }

  return result;
};

export const getKeysDifferentFields = (firstObject, secondObject) =>
  Object.keys(firstObject).reduce(
    (acc, key) =>
      firstObject[key] !== secondObject[key] ? [...acc, key] : acc,
    []
  );
