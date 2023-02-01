import { isPositiveInteger } from './validation';
import { Errors } from '../consts/consts';

export const productValidation = (form) => {
  const { store, price, name, category, remains, weight } = form;
  return {
    store: store.length > 0 ? null : Errors.REQUIRED_FIELD,
    price: isPositiveInteger(price) ? null : Errors.INTEGER,
    name: name.length > 0 ? null : Errors.REQUIRED_FIELD,
    category: category.length > 0 ? null : Errors.REQUIRED_FIELD,
    remains: isPositiveInteger(remains) ? null : Errors.INTEGER,
    weight: isPositiveInteger(weight) ? null : Errors.INTEGER,
  };
};
