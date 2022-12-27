import React, {useEffect, useState} from 'react';

import {isValidEmail, isValidPassword} from "../../utils/validation";
import {checkExistsAccountByEmailAndPassword} from "../../utils/utils";
import {Errors, KeysLocalStorage, Paths} from "../../consts/consts";
import {getDataFromLocalStorage} from "../../utils/localStorage";
import ContainerSignInAndSignUp from "../../components/ContainerSignInAndSignUp";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import RouteLink from "../../components/RouteLink/RouteLink";
import Form from "../../components/Form/Form";
import {useForm} from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";

import styles from './SignIn.module.css';

const SignIn = () => {
    const [errors, setErrors] = useState({
        email: null,
        password: null,
        existsAccount: false,
    });
    const [accounts, setAccounts] = useState([]);
    const [checkAccountExists, setCheckAccountExists] = useState(false);
    const [form, setForm] = useForm({
        email: '',
        password: ''
    });
    const {logIn} = useAuth();

    useEffect(() => {
        setAccounts(getDataFromLocalStorage(KeysLocalStorage.accounts));
    }, []);

    useEffect(() => {
        if (errors.existsAccount && checkAccountExists) {
            const account = accounts.find((account) => account.mail === form.mail);
            localStorage.setItem(KeysLocalStorage.userId, account.id);
            logIn();
        }
    }, [checkAccountExists, errors.existsAccount, accounts, form, logIn]);

    const handleChange = (event) => {
        setCheckAccountExists(false);
        setForm(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = form;
        const isExistsAccount = checkExistsAccountByEmailAndPassword(accounts, email, password);

        setErrors({
            email: isValidEmail(email) ? null : Errors.email,
            password: isValidPassword(password) ? null : Errors.password,
            existsAccount: isExistsAccount,
        });

        setCheckAccountExists(true)
    };

    return (
        <ContainerSignInAndSignUp>
            <Form formName="Sign in" onSubmit={handleSubmit}>
                <div className={styles.containerEmail}>
                    <Input type="text" name="email" placeholder="Email" titleName="Email" error={errors.email} onChange={handleChange} />
                </div>
                <div className={styles.containerPassword}>
                    <Input type="password" name="password" placeholder="Enter password" titleName="Password"
                           error={errors.password} onChange={handleChange} />
                </div>
                <div className={styles.containerError}>
                    {checkAccountExists && !errors.existsAccount
                        ? <p className={styles.accountExist}>Invalid email or password</p>
                        : ''
                    }
                </div>
                <div className={styles.containerButton}>
                    <Button type="submit">Log in</Button>
                </div>
                <div>
                    <span className={styles.haveAccountText}>Don't have an account? </span>
                    <RouteLink to={Paths.signUp}>Create account</RouteLink>
                </div>
            </Form>
        </ContainerSignInAndSignUp>
    );
};

export default SignIn;