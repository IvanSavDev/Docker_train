import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import ContainerSignInAndSignUp from '../../components/Containers/ContainerSignInAndSignUp';
import Input from '../../components/Inputs/Input';
import RouteLink from '../../components/RouteLink/RouteLink';
import Form from '../../components/Form/Form';
import StandardButton from '../../components/Buttons/StandardButton';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import { haveErrors } from '../../utils/utils';
import {
  Errors,
  FetchErrors,
  KeysLocalStorage,
  PasswordErrors,
  Paths,
  Routes,
} from '../../consts/consts';
import routes from '../../routes';

import styles from './SignIn.module.css';

const isInvalidAccount = (errors) => {
  if (errors.invalidAccount) {
    return Boolean(errors.email || errors.password);
  }
  return true;
};

const checkErrors = (form) => {
  const { email, password } = form;

  return {
    email: isValidEmail(email) ? null : Errors.EMAIL,
    password: isValidPassword(password)
      ? null
      : PasswordErrors.INVALID_PASSWORD,
  };
};

const initialStateErrors = {
  email: null,
  password: null,
  invalidAccount: null,
};

const initialStateForm = {
  email: '',
  password: '',
};

const SignIn = () => {
  const [errors, setErrors] = useState(initialStateErrors);
  const [form, setForm] = useForm(initialStateForm);
  const { logIn } = useAuth();

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = form;
    const checkedErrors = checkErrors(form);
    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      try {
        setErrors(initialStateErrors);
        const response = await axios.post(
          `http://localhost:4000/${Routes.LOGIN}`,
          {
            email,
            password,
          },
        );
        localStorage.setItem(KeysLocalStorage.TOKEN, response.data.token);
        logIn();
      } catch (error) {
        const errorsInfo = error.response.data.errors;
        if (
          error.name === 'AxiosError' &&
          (error.response.status === 404 || error.response.status === 400) &&
          errorsInfo
        ) {
          const formattedErrors = errorsInfo.reduce(
            (acc, errorInfo) => ({
              ...acc,
              [errorInfo.parameter]: errorInfo.message,
            }),
            {},
          );

          setErrors((prevState) => ({
            ...prevState,
            ...formattedErrors,
          }));
        } else {
          toast.error(FetchErrors.UNEXPECTED);
        }
      }
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
          {isInvalidAccount(errors) || (
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
