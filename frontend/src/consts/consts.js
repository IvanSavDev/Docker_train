export const REG_EMAIL = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,})/;
export const REG_PASSWORD =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const SERVER_ROUTE = 'http://localhost:4000';

export const Errors = {
  FULL_NAME: 'Minimum 3 characters required',
  COMPANY_NAME: 'Minimum 1 character required',
  EMAIL: 'Invalid email',
  REQUIRED_FIELD: 'Required field',
  MORE_ZERO: 'Value must be greater than 0',
  INTEGER: 'The number must be a positive integer',
  INVALID_DATE: 'Invalid date',
  NOT_ENOUGH_GOODS: 'Not enough goods',
  MODAL: 'An error has occurred. Reload modal window',
};

export const PasswordErrors = {
  SAME_PASSWORD: 'Same password',
  NEW_PASSWORD: 'Enter new password',
  OLD_PASSWORD: 'Enter old password',
  INVALID_PASSWORD:
    'Minimum 8 characters required, 1 special character and 1 number',
  CONFIRMED_PASSWORD: 'Does not match the entered password',
  MATCH_PASSWORD: 'Not equal to password above',
};

export const FetchErrors = {
  UNEXPECTED: 'Unexpected error',
  AUTHORIZATION: 'Access denied',
  UPLOAD_DATA: 'An error occurred during loading data',
  UPLOAD_USER: 'An error occurred during loading user data',
  UPLOAD_IMAGE: 'Photo upload error',
};

export const KeysLocalStorage = {
  TOKEN: 'token',
};

export const Statuses = {
  FULFILLED: 'fulfilled',
  PENDING: 'pending',
  REJECTED: 'rejected',
};

export const Paths = {
  BASE: '/',
  SIGN_IN: '/signin',
  SIGN_UP: '/signup',
  MAIN: '/main',
  MY_PRODUCT: '/myproduct',
  MY_SALES: '/mysales',
  PERSONAL_CABINET: '/personalcabinet',
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

export const ModalsTypes = {
  CREATE_PRODUCT: 'createProduct',
  EDIT_PRODUCT: 'editProduct',
  SELL_PRODUCT: 'sellProduct',
};
