export const PORT = 4000;
export const KEY_JWT = 'SuperSecret';
export const SALT_ROUNDS = 10;
export const TOKEN_LIFESPAN = '30d';
export const REG_PASSWORD =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const Errors = {
  PERMISSION_DENIED: 'Permission denied',
  INVALID_DATA: 'Invalid data',
  FAILED_REGISTRATION: 'Failed to registration',
  FAILED_AUTHENTICATION: 'Failed to authentication',
  FAILED_AUTHORIZATION: 'Failed to authorization',
  MORE_ZERO: 'Value must be greater than 0',
  MORE_ONE_SYMBOL: 'Minimum 1 character required',
  MORE_THREE_SYMBOLS: 'Minimum 3 characters required',
  INTEGER: 'The number must be a positive integer',
  INVALID_DATE: 'Invalid Date',
  NOT_VALID_ADDRESS: 'Not valid address',
  FILE: 'File upload error',
  UNKNOWN: 'Unknown error',
  NOT_ENOUGH_GOODS: 'Not enough goods',
};

export const EmailErrors = {
  EMAIL_EXIST: 'Email exist',
  INVALID_EMAIL: 'Invalid email',
};

export const UserErrors = {
  UPDATE_USER: 'Error during editing user',
  NOT_VALID_USER: 'Not valid user data',
  GET_USER: 'Error during getting user',
};

export const ProductErrors = {
  CREATE_PRODUCT: 'Error occurred during product creation',
  UPDATE_PRODUCT: 'Error during editing product',
  DELETE_PRODUCT: 'Error during delete product',
  GET_PRODUCTS: 'Error when receiving products',
  NOT_FOUND_PRODUCT: 'Not found product',
  NOT_FOUND_PRODUCTS: 'Not found products',
  NOT_VALID_PRODUCT: 'Not valid product',
};

export const SaleErrors = {
  GET_SALES: 'Error occurred during receiving sales',
  CREATE_SALE: 'Error occurred during sale creation',
  UPDATE_SALE: 'Error during editing sale',
  NOT_FOUND_SALES: 'Not found sales',
  NOT_FOUND_SALE: 'Not found sale',
  Not_valid_sale: 'Not valid sale',
};

export const PasswordErrors = {
  SAME_PASSWORD: 'Same password',
  EQUAL_OLD_PASSWORD: 'Does not equal old password',
  INVALID_PASSWORD:
    'Minimum 8 characters required, 1 special character and 1 number',
  CONFIRMED_PASSWORD: 'Does not match the entered password',
  EMPTY_NEW_PASSWORD: 'Required to enter a new password',
  EMPTY_OLD_PASSWORD: 'Required to enter a old password',
};

export const Routes = {
  SALE: '/sale',
  SALES: '/sales',
  PRODUCT: '/product',
  PRODUCTS: '/products',
  LOGIN: '/login',
  REGISTRATION: '/registration',
  USER: '/user',
  UPLOAD_AVATAR: '/upload/avatar',
  UPLOAD_BACKGROUND: '/upload/background',
};
