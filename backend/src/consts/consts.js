export const PORT = 4000;
export const KEY_JWT = 'Secret123';

export const TOKEN_LIFESPAN = '30d';

export const Errors = {
  Permission_denied: 'Permission denied',
  Invalid_Data: 'Invalid data',
  Failed_Registration: 'Failed to registration',
  Failed_Authorization: 'Failed to authorization',
  Failed_Authentication: 'Failed to authentication',
  Failed_Identification: 'Wrong email or password',
  More_zero: 'Value must be greater than 0',
  More_one_symbol: 'Minimum 1 character required',
  More_three_symbol: 'Minimum 3 character required',
  Integer: 'Value must be integer and greater than 0',
  Invalid_Date: 'Invalid Date',
  Not_valid_address: 'Not valid address',
};

export const EmailErrors = {
  EMAIL_EXIST: 'Email exist',
  INVALID_EMAIL: 'Not valid email',
};

export const UserErrors = {
  UPDATE_USER: 'Error during editing user',
  NOT_VALID_USER: 'Not valid user data',
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
  Sale: '/sale',
  Sales: '/sales',
  Product: '/product',
  Products: '/products',
  Login: '/login',
  Registration: '/registration',
  User: '/user',
};

export const REG_PASSWORD =
  /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
