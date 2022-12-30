import React, { useContext } from "react";
import AccountsContext from "../context/AccountsContext";

const useAccounts = () => useContext(AccountsContext);

export default useAccounts;
