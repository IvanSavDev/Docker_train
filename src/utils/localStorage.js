export const getAccounts = (key) => JSON.parse(localStorage.getItem(key)) || [];
