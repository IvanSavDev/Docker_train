export const getDataFromLocalStorage = (key) => JSON.parse(localStorage.getItem(key)) || [];

export const setDataInLocalStorage = (key, data) => localStorage.setItem(key, JSON.stringify(data));