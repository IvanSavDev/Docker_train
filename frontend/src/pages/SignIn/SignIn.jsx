import React, { useState } from "react";

import useProducts from "../../hooks/useProducts";
import useSales from "../../hooks/useSales";
import useForm from "../../hooks/useForm";
import useAuth from "../../hooks/useAuth";
import useAccount from "../../hooks/useAccount";
import ContainerSignInAndSignUp from "../../components/Containers/ContainerSignInAndSignUp";
import Input from "../../components/Inputs/Input";
import RouteLink from "../../components/RouteLink/RouteLink";
import Form from "../../components/Form/Form";
import StandardButton from "../../components/Buttons/StandardButton";
import { setDataInLocalStorage } from "../../utils/localStorage";
import { isValidEmail, isValidPassword } from "../../utils/validation";
import { getAccountByEmailAndPassword } from "../../utils/utils";
import { Errors, KeysLocalStorage, Paths } from "../../consts/consts";

import styles from "./SignIn.module.css";

const SignIn = () => {
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    existsAccount: true,
  });
  const { logIn } = useAuth();
  const { updateAccount } = useAccount();
  const { updateProducts } = useProducts();
  const { updateSales } = useSales();
  const { loadAccountFromLocalStorage } = useAccount();
  const [form, setForm] = useForm({
    email: "",
    password: "",
  });

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
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
      updateProducts();
      updateSales();
      loadAccountFromLocalStorage();
      logIn();
    } else {
      setErrors(checkedErrors);
    }
  };

  return (
    <ContainerSignInAndSignUp>
      <Form formName="Sign in" onSubmit={handleSubmit}>
        <Input
          name="email"
          label="Email"
          error={Boolean(errors.email)}
          helperText={errors.email}
          onChange={handleChange}
          value={form.email}
          autoFocus
        />
        <Input
          type="password"
          name="password"
          label="Enter password"
          error={Boolean(errors.password)}
          helperText={errors.password}
          onChange={handleChange}
          value={form.password}
        />
        <div className={styles.containerError}>
          {errors.existsAccount ||
            Boolean(errors.email) ||
            Boolean(errors.password) || (
              <p className={styles.invalidValue}>Invalid email or password</p>
            )}
        </div>
        <StandardButton type="submit" sx={{ marginBottom: "32px" }} fullWidth>
          Log in
        </StandardButton>
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
