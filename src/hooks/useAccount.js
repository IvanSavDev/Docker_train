import React, { useContext } from "react";
import AccountContext from "../context/AccountContext";

const useAccount = () => useContext(AccountContext);

export default useAccount;
