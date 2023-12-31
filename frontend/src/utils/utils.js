export const isEmptyObject = (object) => Object.keys(object).length === 0;

export const isDifferentFields = (oldAccount, newAccount) =>
  !Object.keys(oldAccount).every((key) => oldAccount[key] === newAccount[key]);

export const haveErrors = (errors) =>
  Object.values(errors).every((error) => !error);

export const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

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
  `#${Math.floor(Math.random() * (0xffffff + 1))
    .toString(16)
    .padStart(6, '0')}`;

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
  if (countSymbolsInNumber === 1) {
    return 10;
  }
  const firstTwoNumbers = Number(numberAsString.slice(0, 2));
  const nextNumber = firstTwoNumbers + 1;
  const secondSymbol = Number(String(nextNumber)[1]);
  const lengthWithoutTwoSymbols = numberAsString.length - 2;

  if (secondSymbol === 0 || secondSymbol === 5) {
    return addZeros(nextNumber, lengthWithoutTwoSymbols);
  }
  return getMultipleOFFive(addZeros(nextNumber, lengthWithoutTwoSymbols));
};

export const parseDate = (date) => {
  const [day, month, year] = date.split('.');
  return new Date(year, month - 1, day);
};

export const sortByDate = (data, key) => {
  if (Array.isArray(data)) {
    return [...data].sort(
      (firstData, secondData) =>
        parseDate(secondData[key]).getTime() -
        parseDate(firstData[key]).getTime(),
    );
  }
  return data;
};
export const getChangedFields = (firstObject, secondObject) =>
  Object.keys(firstObject).reduce(
    (acc, key) =>
      firstObject[key] === secondObject[key]
        ? acc
        : { ...acc, [key]: secondObject[key] },
    {},
  );

export const debounceAsyncFunction = (fun, timeout = 1000) =>
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

export const formattingErrorsFromBackend = (errors) =>
  Array.isArray(errors)
    ? errors.reduce(
        (acc, errorInfo) => ({
          ...acc,
          [errorInfo.parameter]: errorInfo.message,
        }),
        {},
      )
    : {};

export const trimObjectValues = (object) =>
  Object.keys(object).reduce((acc, key) => {
    const value = object[key];
    return {
      ...acc,
      [key]: typeof value === 'string' ? value.trim() : value,
    };
  }, {});

export const getUniqueValuesByKey = (data) =>
  Array.from(new Set(data.map((sale) => sale.category)));

export const formattingNumericValueFromForm = (formValue) =>
  formValue === '' ? null : Number(formValue);

export const throttle = (fun, delay = 500) => {
  let timer = null;

  return function perform(...args) {
    if (timer) return;

    timer = setTimeout(() => {
      fun(...args);
      clearTimeout(timer);
      timer = null;
    }, delay);
  };
};
