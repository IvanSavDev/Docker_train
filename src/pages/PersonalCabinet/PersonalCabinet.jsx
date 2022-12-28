import React, {useEffect, useLayoutEffect, useState} from 'react';

import Header from "../../components/Header/Header";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";

import {getDataFromLocalStorage, setDataInLocalStorage} from "../../utils/localStorage";
import {Errors, KeysLocalStorage} from "../../consts/consts";
import {useForm} from "../../hooks/useForm";
import {
    isMatchPassword,
    isValidCompanyName,
    isValidEmail,
    isValidFullName,
    isValidPassword
} from "../../utils/validation";
import {checkNewEmailOnValidation, isDifferencesWithOldAccount, isEmptyProperties} from "../../utils/utils";

import styles from './PersonalCabinet.module.css'

const initialStateForm = {
    name: '',
    surname: '',
    companyName: '',
    email: '',
    password: '',
    newPassword: '',
    address: '',
}

const PersonalCabinet = () => {
    const [form, setForm] = useForm({...initialStateForm});
    const [errors, setErrors] = useState({
        name: null,
        surname: null,
        companyName: null,
        email: null,
        password: null,
        newPassword: null,
    });
    const [currentAccount, setCurrentAccount] = useState({});
    const [accounts, setAccounts] = useState([]);
    const [disabledButton, setDisabledButton] = useState(true);

    useLayoutEffect(() => {
        const userId = getDataFromLocalStorage(KeysLocalStorage.userId);
        const accounts = getDataFromLocalStorage(KeysLocalStorage.accounts);
        const account = accounts.find((account) => account.id === userId);
        setForm({
            name: account.name,
            surname: account.surname,
            companyName: account.companyName,
            email: account.email,
            address: account.address || ''
        })
        setCurrentAccount(account);
        setAccounts(accounts);
    }, [setForm]);

    useEffect(() => {
        setDisabledButton(isDifferencesWithOldAccount({
            name: currentAccount.name,
            surname: currentAccount.surname,
            companyName: currentAccount.companyName,
            email: currentAccount.email,
            address: currentAccount.address,
            password: '',
            newPassword: '',
        }, {
            name: form.name,
            surname: form.surname,
            companyName: form.companyName,
            email: form.email,
            address: form.address,
            password: form.password,
            newPassword: form.newPassword
        }));
    }, [form, currentAccount]);

    const handleChange = ({target}) => setForm({[target.name]: target.value});

    const handleSubmit = (event) => {
        event.preventDefault();
        const {name, surname, companyName, email, password, newPassword, address} = form;

        const isExistsAccount = checkNewEmailOnValidation(accounts, currentAccount.email, email);

        const checkedErrors = {
            name: isValidFullName(name) ? null : Errors.fullname,
            surname: isValidFullName(surname) ? null : Errors.fullname,
            companyName: isValidCompanyName(companyName) ? null : Errors.companyName,
            email: isValidEmail(email)
                ? !isExistsAccount
                    ? null
                    : Errors.accountExists
                : Errors.email,
            address: isValidFullName(address) ? null : Errors.fullname,
            password: isMatchPassword(password, currentAccount.password) ? null : Errors.matchOldPassword,
            newPassword: isValidPassword(newPassword) ? null : Errors.password,
        };

        const isNotErrors = Object.values(checkedErrors).every(error => !error);

        if (isNotErrors && !isEmptyProperties(form)) {
            const updatedAccounts = accounts.map((account) => account.id === currentAccount.id
                ? {
                    id: currentAccount.id,
                    name: form.name,
                    surname: form.surname,
                    companyName: form.companyName,
                    email: form.email,
                    password: form.newPassword,
                    address: form.address
                }
                : account
            );
            setDataInLocalStorage(KeysLocalStorage.accounts, updatedAccounts);
            setForm({
                password: '',
                newPassword: '',
            });
        }

        setErrors(checkedErrors);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Header title="Personal Cabinet" description="Information about your account"/>
            <div className={styles.container}>
                <Input
                    name="name"
                    type="text"
                    titleName="First name"
                    placeholder="First name"
                    containerStyles={styles.name}
                    value={form.name}
                    error={errors.name}
                    onChange={handleChange}
                />
                <Input
                    name="surname"
                    type="text"
                    titleName="Last name"
                    placeholder="Last name"
                    containerStyles={styles.surname}
                    value={form.surname}
                    error={errors.surname}
                    onChange={handleChange}
                />
                <Input
                    name="companyName"
                    type="text"
                    titleName="Company name"
                    placeholder="Company name"
                    containerStyles={styles.companyName}
                    value={form.companyName}
                    error={errors.companyName}
                    onChange={handleChange}/>
                <Input
                    name="email"
                    type="text"
                    titleName="Email"
                    placeholder="Email"
                    containerStyles={styles.email}
                    value={form.email}
                    error={errors.email}
                    onChange={handleChange}
                />
                <Input
                    name="address"
                    type="text"
                    titleName="Address"
                    placeholder="Enter your address"
                    containerStyles={styles.address}
                    value={form.address}
                    error={errors.address}
                    onChange={handleChange}
                />
                <Input
                    name="password"
                    type="password"
                    titleName="Enter old password"
                    placeholder="Enter old password"
                    containerStyles={styles.oldPassword}
                    value={form.password}
                    error={errors.password}
                    onChange={handleChange}
                />
                <Input
                    name="newPassword"
                    type="password"
                    titleName="Enter a new password"
                    placeholder="Enter a new password"
                    containerStyles={styles.newPassword}
                    value={form.newPassword}
                    error={errors.newPassword}
                    onChange={handleChange}
                />
            </div>
            <Button type="submit" disabled={disabledButton}>Save changes</Button>
        </form>
    )
};

export default PersonalCabinet;