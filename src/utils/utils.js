export const isEmptyProperties = (object) => {
    return Object.keys(object).some((key) => object[key].length === 0);
};

export const checkExistsAccountByEmail = (accounts, email) => {
    const account = accounts.find((account) => account.email === email);
    return Boolean(account);
};

export const checkNewEmailOnValidation = (accounts, oldEmail, newEmail) => {
    if (oldEmail === newEmail) {
        return false;
    }
    return checkExistsAccountByEmail(accounts, newEmail);
};

export const isDifferencesWithOldAccount = (oldAccount, newAccount) => {
    return Object.keys(oldAccount).every(key => oldAccount[key] === newAccount[key]);
}

export const checkExistsAccountByEmailAndPassword = (accounts, email, password) => {
    const account = accounts.find((account) => account.email === email && account.password === password);
    return Boolean(account)
};
