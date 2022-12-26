import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";

import {isValidEmail, isValidPassword} from "../../utils/validation";
import {checkExistsAccountByEmailAndPassword} from "../../utils/utils";
import {EMAIL_ERROR, PASSWORD_ERROR, Paths} from "../../consts/consts";
import {getDataFromLocalStorage} from "../../utils/localStorage";
import ContainerSignInAndSignUp from "../ContainerSignInAndSignUp";
import Input from "../Inputs/Input";
import Button from "../Buttons/Button";
import RouteLink from "../RouteLink/RouteLink";
import Form from "../Form/Form";
import {useForm} from "../Hooks/useForm";

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
    const navigate = useNavigate();

    useEffect(() => {
        setAccounts(getDataFromLocalStorage('accounts'));
    }, []);

    useEffect(() => {
        if (errors.existsAccount && checkAccountExists) {
            navigate(Paths.main);
        }
    }, [checkAccountExists, errors.existsAccount, navigate]);

    const handleChange = (event) => {
        setCheckAccountExists(false);
        setForm(event);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const { email, password } = form;
        const isExistsAccount = checkExistsAccountByEmailAndPassword(accounts, email, password);

        setErrors({
            email: isValidEmail(email) ? null : EMAIL_ERROR,
            password: isValidPassword(password) ? null : PASSWORD_ERROR,
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
}

export default SignIn;