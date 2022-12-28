export const REG_EMAIL = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
export const REG_PASSWORD = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const Errors = {
    fullname: 'Minimum 3 characters required',
    companyName: 'Please enter more than 1 character',
    email: 'Does not match the email',
    password: 'Minimum 8 characters required, 1 special character and 1 number',
    matchPassword: 'Not equal to password above',
    matchOldPassword: 'Not equal to old password',
    accountExists: 'Account already exist'
}

export const KeysLocalStorage = {
    userId: 'userId',
    accounts: 'accounts'
}

export const Paths = {
    base: '/',
    signIn: '/signin',
    signUp: '/signup',
    main: "/main",
    myProduct: "/myproduct",
    mySales: "/mySales",
    personalCabinet: "/personalcabinet"
}