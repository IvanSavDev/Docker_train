import { getDataFromLocalStorage } from './localStorage';
import { KeysLocalStorage } from '../consts/consts';

export const isEmptyObject = (object) => Object.keys(object).length === 0;

export const checkExistsAccountByEmail = (email) => {
  const accounts = getDataFromLocalStorage(KeysLocalStorage.accounts);
  if (accounts) {
    const account = Object.values(accounts).find(
      (currentAccount) => currentAccount.email === email,
    );
    return Boolean(account);
  }
  return null;
};

export const getAccountByEmailAndPassword = (email, password) => {
  const accounts = getDataFromLocalStorage(KeysLocalStorage.accounts);
  return accounts
    ? Object.values(accounts).find(
        (account) => account.email === email && account.password === password,
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
    (key) => oldAccount[key] === newAccount[key],
  );
};

export const haveErrors = (errors) =>
  Object.values(errors).every((error) => !error);

export const generateId = () => Date.now() + Math.floor(Math.random() * 100);

export const getFormatDate = (dateForFormat) =>
  new Date(dateForFormat).toLocaleDateString();

export const formatNumberWithSymbol = (number, symbol = ' ') => {
  let result = '';
  const numberAsStringArray = String(number).split('');
  for (let i = 1; i <= numberAsStringArray.length; i += 1) {
    const j = numberAsStringArray.length - i;
    result =
      (!j || i % 3 ? numberAsStringArray[j] : symbol + numberAsStringArray[j]) +
      result;
  }

  return result;
};

export const getKeysDifferentFields = (firstObject, secondObject) =>
  Object.keys(firstObject).reduce(
    (acc, key) =>
      firstObject[key] !== secondObject[key] ? [...acc, key] : acc,
    [],
  );

export const generateColor = () =>
  `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export const addZeros = (number, count) => {
  let result = String(number);
  for (let i = 0; i < count; i += 1) {
    result += '0';
  }
  return Number(result);
};

export const getMultipleOFFive = (number) => {
  const numberAsString = String(number);
  const countSymbolsInNumber = numberAsString.length;
  const lengthWithoutTwoSymbols = numberAsString.length - 2;
  if (countSymbolsInNumber === 1) {
    return 10;
  }
  const lastSymbols = Number(String(number).slice(0, 2));
  const nextSymbols = lastSymbols + 1;
  const secondSymbol = Number(String(nextSymbols)[1]);

  if (secondSymbol === 0 || secondSymbol === 5) {
    return addZeros(nextSymbols, lengthWithoutTwoSymbols);
  }
  return getMultipleOFFive(addZeros(nextSymbols, lengthWithoutTwoSymbols));
};
