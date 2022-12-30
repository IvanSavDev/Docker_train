import { BrowserRouter } from "react-router-dom";

import AppRouter from "../router/router";
import AuthProvider from "../hoc/AuthProvider";
import AccountProvider from "../hoc/AccountProvider";
import ProductsProvider from "../hoc/ProductsProvider";
import SalesProvider from "../hoc/SalesProvider";

const App = () => (
  <AuthProvider>
    <AccountProvider>
      <ProductsProvider>
        <SalesProvider>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </SalesProvider>
      </ProductsProvider>
    </AccountProvider>
  </AuthProvider>
);

export default App;
