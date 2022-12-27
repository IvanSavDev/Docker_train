export const REG_EMAIL = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/;
export const REG_PASSWORD = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export const FULLNAME_ERROR = 'Minimum 3 characters required';

export const COMPANY_NAME_ERROR = 'Please enter more than 1 character';
export const EMAIL_ERROR = 'Does not match the email';

export const PASSWORD_ERROR = 'Minimum 8 characters required, 1 special character and 1 number';

export const MATCH_PASSWORD_ERROR = 'Not equal to password above';

export const ACCOUNT_EXISTS_ERROR = 'Account already exist';

export const Paths = {
    base: '/',
    signIn: '/signin',
    signUp: '/signup',
    main: "/main",
    myProduct: "/myproduct",
    mySales: "/mySales",
    personalCabinet: "/personalcabinet"
}