import React, { useState } from 'react';
import axios from 'axios';

import ContainerSignInAndSignUp from '../../components/Containers/ContainerSignInAndSignUp';
import Input from '../../components/Inputs/Input';
import RouteLink from '../../components/RouteLink/RouteLink';
import Form from '../../components/Form/Form';
import StandardButton from '../../components/Buttons/StandardButton';

import { haveErrors, trimObjectValues } from '../../utils/utils';
import { notifyLoginErrors } from '../../utils/notifyErrors';
import { loginValidation } from '../../validations/loginValidation';
import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import {
  KeysLocalStorage,
  Paths,
  Routes,
  SERVER_ROUTE,
} from '../../consts/consts';

import styles from './SignIn.module.css';

const initialStateErrors = {
  email: null,
  password: null,
  invalidAccount: null,
};

const SignIn = () => {
  const [errors, setErrors] = useState(initialStateErrors);
  const [form, setForm] = useForm({ email: '', password: '' });
  const { logIn } = useAuth();

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const updatedForm = trimObjectValues(form);
    const validationResult = loginValidation(updatedForm);
    const isNotErrors = haveErrors(validationResult);

    if (isNotErrors) {
      try {
        setErrors({ ...initialStateErrors });
        const response = await axios.post(
          `${SERVER_ROUTE}${Routes.LOGIN}`,
          updatedForm,
        );
        localStorage.setItem(KeysLocalStorage.TOKEN, response.data.token);
        logIn();
      } catch (error) {
        notifyLoginErrors(error, setErrors);
      }
    } else {
      setErrors(validationResult);
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
          {errors.invalidAccount && (
            <p className={styles.invalidValue}>Invalid email or password</p>
          )}
        </div>
        <StandardButton type="submit" sx={{ marginBottom: '32px' }} fullWidth>
          Log in
        </StandardButton>
        <div>
          <span className={styles.haveAccountText}>
            {`Don't have an account? `}
          </span>
          <RouteLink to={Paths.SIGN_UP}>Create account</RouteLink>
        </div>
      </Form>
    </ContainerSignInAndSignUp>
  );
};

export default SignIn;
