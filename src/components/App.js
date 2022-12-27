import {BrowserRouter} from "react-router-dom";

import AppRouter from "../router/router";
import AuthProvider from "../hoc/AuthProvider";

const App = () => (
    <AuthProvider>
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    </AuthProvider>
);

export default App;
