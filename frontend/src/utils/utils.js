export const isEmptyObject = (object) => Object.keys(object).length === 0;

export const isDifferencesWithOldAccount = (oldAccount, newAccount) => {
  return Object.keys(oldAccount).every(
    (key) => oldAccount[key] === newAccount[key],
  );
};

export const haveErrors = (errors) =>
  Object.values(errors).every((error) => !error);

export const generateId = () => Date.now() + Math.floor(Math.random() * 100);

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

export const parseDate = (date) => {
  const [day, month, year] = date.split('.');
  return new Date(year, month - 1, day);
};

export const getChangedFields = (firstObject, secondObject) => {
  return Object.keys(firstObject).reduce((acc, key) => {
    return firstObject[key] === secondObject[key]
      ? acc
      : { ...acc, [key]: secondObject[key] };
  }, {});
};

export const debounceAsyncFunction = (fun, timeout = 3000) =>
  new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const result = await fun();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    }, timeout);
  });

export const formatErrors = (errors) =>
  errors.reduce(
    (acc, errorInfo) => ({
      ...acc,
      [errorInfo.parameter]: errorInfo.message,
    }),
    {},
  );
