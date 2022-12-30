import React, { useState } from "react";

import { isValidEmail, isValidPassword } from "../../utils/validation";
import {
  checkExistAccount,
  findAccountByEmailAndPassword,
  getAccountByEmailAndPassword,
} from "../../utils/utils";
import { Errors, KeysLocalStorage, Paths } from "../../consts/consts";
import ContainerSignInAndSignUp from "../../components/ContainerSignInAndSignUp";
import Input from "../../components/Inputs/Input";
import Button from "../../components/Buttons/Button";
import RouteLink from "../../components/RouteLink/RouteLink";
import Form from "../../components/Form/Form";
import { useForm } from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import useAccounts from "../../hooks/useAccounts";
import useAccount from "../../hooks/useAccount";

import styles from "./SignIn.module.css";
import { setDataInLocalStorage } from "../../utils/localStorage";

const SignIn = () => {
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    existsAccount: true,
  });
  const { logIn } = useAuth();
  const { updateAccount } = useAccount();
  const [form, setForm] = useForm({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = form;

    const account = getAccountByEmailAndPassword(email, password);
    const isExistsAccount = Boolean(account);

    const checkedErrors = {
      email: isValidEmail(email) ? null : Errors.email,
      password: isValidPassword(password) ? null : Errors.password,
      existsAccount: isExistsAccount,
    };

    if (isExistsAccount) {
      setDataInLocalStorage(KeysLocalStorage.userId, account.id);
      updateAccount(account);
      logIn();
    } else {
      setErrors(checkedErrors);
    }
  };

  return (
    <ContainerSignInAndSignUp>
      <Form formName="Sign in" onSubmit={handleSubmit}>
        <div className={styles.containerEmail}>
          <Input
            type="text"
            name="email"
            placeholder="Email"
            titleName="Email"
            error={errors.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerPassword}>
          <Input
            type="password"
            name="password"
            placeholder="Enter password"
            titleName="Password"
            error={errors.password}
            onChange={handleChange}
          />
        </div>
        <div className={styles.containerError}>
          {errors.existsAccount ||
            Boolean(errors.email) ||
            Boolean(errors.password) || (
              <p className={styles.accountExist}>Invalid email or password</p>
            )}
        </div>
        <div className={styles.containerButton}>
          <Button type="submit" classNames={styles.button}>
            Log in
          </Button>
        </div>
        <div>
          <span className={styles.haveAccountText}>
            Don't have an account?{" "}
          </span>
          <RouteLink to={Paths.signUp}>Create account</RouteLink>
        </div>
      </Form>
    </ContainerSignInAndSignUp>
  );
};

export default SignIn;
