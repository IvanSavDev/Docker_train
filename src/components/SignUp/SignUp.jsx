import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {
    ACCOUNT_EXISTS_ERROR, COMPANY_NAME_ERROR,
    EMAIL_ERROR,
    FULLNAME_ERROR,
    MATCH_PASSWORD_ERROR,
    PASSWORD_ERROR, Paths
} from "../../consts/consts";
import ContainerSignInAndSignUp from '../ContainerSignInAndSignUp';
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import Form from "../Form/Form";
import RouteLink from "../RouteLink/RouteLink";
import {
    isMatchPassword,
    isValidCompanyName,
    isValidEmail,
    isValidFullName,
    isValidPassword
} from "../../utils/validation";
import {getDataFromLocalStorage, setDataInLocalStorage} from "../../utils/localStorage";
import {checkExistsAccountByEmail, isEmptyProperties} from "../../utils/utils";
import {useForm} from "../Hooks/useForm";

import styles from './SignUp.module.css';

const SignUp = () => {
    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        companyName: null,
        email: null,
        password: null,
        repeatPassword: null,
        accountExists: null,
    });
    const [form, setForm] = useForm({
        name: '',
        surname: '',
        companyName: '',
        email: '',
        password: '',
        repeatPassword: ''
    })
    const [accounts, setAccounts] = useState([]);
    const [checkAccountExists, setCheckAccountExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setAccounts(getDataFromLocalStorage('accounts'));
    }, [errors]);

    useEffect(() => {
        const isNotErrors = Object.values(errors).every(error => !error);
        if (isNotErrors && checkAccountExists) {
            setDataInLocalStorage('accounts', [...accounts, form]);
            navigate(Paths.main);
        }
    });

    const handleChange = (event) => {
        setCheckAccountExists(false);
        setForm(event);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const { name, surname, companyName, email, password, repeatPassword } = form;

        const isExistsAccount = checkExistsAccountByEmail(accounts, email);

        const checkedErrors = {
            name: isValidFullName(name) ? null : FULLNAME_ERROR,
            surname: isValidFullName(surname) ? null : FULLNAME_ERROR,
            companyName: isValidCompanyName(companyName) ? null : COMPANY_NAME_ERROR,
            email: isValidEmail(email) ? null : EMAIL_ERROR,
            password: isValidPassword(password) ? null : PASSWORD_ERROR,
            repeatPassword: isMatchPassword(password, repeatPassword) ? null : MATCH_PASSWORD_ERROR,
            accountExists: !isExistsAccount ? null : ACCOUNT_EXISTS_ERROR,
        };

        setErrors(checkedErrors);
        setCheckAccountExists(true);
    };

    return (
        <ContainerSignInAndSignUp>
            <Form formName="Create an account" onSubmit={handleSubmit}>
                <div className={styles.containerFullName}>
                    <Input type="text" name="name" placeholder="First name" titleName="First name" error={errors.name} onChange={handleChange} />
                    <Input type="text" name="surname" placeholder="Last name" titleName="Last name" error={errors.surname} onChange={handleChange} />
                </div>
                <div className={styles.containerInput}>
                    <Input type="text" name="companyName" placeholder="Company name" titleName="Company name" error={errors.companyName} onChange={handleChange} />
                </div>
                <div className={styles.containerInput}>
                    <Input type="text" name="email" placeholder="Email" titleName="Email" error={errors.email} onChange={handleChange}/>
                </div>
                <div className={styles.containerInput}>
                    <Input type="password" name="password" placeholder="Enter password" titleName="Password" error={errors.password} onChange={handleChange} />
                </div>
                <div className={styles.containerPassword}>
                    <Input type="password" name="repeatPassword" placeholder="Repeat password" titleName="Repeat password" error={errors.repeatPassword} onChange={handleChange} />
                </div>
                <div className={styles.containerError}>
                    {errors.accountExists
                        && checkAccountExists
                        && !isEmptyProperties(form)
                        ? <p className={styles.accountExists}>Account already exist</p>
                        : ''
                    }
                </div>
                <div className={styles.containerButton}>
                    <Button type="submit">Create account</Button>
                </div>
            </Form>
            <div>
                <span className={styles.alreadyHaveAccount}>Already have an account? </span>
                <RouteLink to={Paths.signIn}>Log in</RouteLink>
            </div>
        </ContainerSignInAndSignUp>
    );
}

export default SignUp;