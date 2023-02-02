import { Errors } from '../consts/consts';

export const sellProductValidation = (
  numberProducts,
  restProducts,
  lastSale,
) => {
  const resultInsertedDate = String(lastSale?.$d);

  return {
    soldItems: Number.isInteger(numberProducts)
      ? numberProducts > 0
        ? restProducts >= 0
          ? null
          : Errors.NOT_ENOUGH_GOODS
        : Errors.MORE_ZERO
      : Errors.INTEGER,
    lastSale: resultInsertedDate
      ? resultInsertedDate !== 'Invalid Date'
        ? new Date(resultInsertedDate).getTime() <= Date.now()
          ? null
          : Errors.INVALID_DATE
        : Errors.INVALID_DATE
      : Errors.INVALID_DATE,
  };
};
