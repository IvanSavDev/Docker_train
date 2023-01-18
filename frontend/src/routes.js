const apiPath = 'http://localhost:4000';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  productPath: () => [apiPath, 'product'].join('/'),
  productsPath: () => [apiPath, 'products'].join('/'),
  salePath: () => [apiPath, 'sale'].join('/'),
  salesPath: () => [apiPath, 'sales'].join('/'),
  registrationPath: () => [apiPath, 'registration'].join('/'),
  userPath: () => [apiPath, 'user'].join('/'),
};

export default routes;
