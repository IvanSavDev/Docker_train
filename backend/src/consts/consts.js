export const PORT = 4000;
export const KEY_JWT = 'Secret123';

export const TOKEN_LIFESPAN = '30d';

export const Errors = {
  Permission_denied: 'Permission denied',
  Invalid_Data: 'Invalid data',
  Failed_Registration: 'Failed to registration',
  Failed_Authorization: 'Failed to authorization',
  Authentication_Error: 'Authentication error',
  Create_product: 'Error occurred during product creation',
  Edit_product: 'Error while editing product',
  Delete_product: 'Error while delete product',
  Get_products: 'Error receiving products',
  Not_found_product: 'Not found product',
  Not_valid_product: 'Not valid product',
  Get_sales: 'Error occurred while receiving sales',
  Create_sale: 'Error occurred during sale creation',
  Edit_sale: 'Error while editing sale',
  Not_found_sales: 'Not found sales',
  Not_valid_sale: 'Not valid sale',
  Edit_user: 'Error while editing user',
  Not_valid_user: 'Not valid user data',
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
