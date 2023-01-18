import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';

import useForm from '../../hooks/useForm';
import useAuth from '../../hooks/useAuth';
import ContainerSignInAndSignUp from '../../components/Containers/ContainerSignInAndSignUp';
import Input from '../../components/Inputs/Input';
import RouteLink from '../../components/RouteLink/RouteLink';
import Form from '../../components/Form/Form';
import StandardButton from '../../components/Buttons/StandardButton';
import { isValidEmail, isValidPassword } from '../../utils/validation';
import { haveErrors } from '../../utils/utils';
import { Errors, Paths } from '../../consts/consts';
import routes from '../../routes';
import { getSales } from '../../slices/salesSlice';
import { getUser } from '../../slices/userSlice';

import styles from './SignIn.module.css';

const SignIn = () => {
  const [errors, setErrors] = useState({
    email: null,
    password: null,
    invalidAccount: null,
  });
  const dispatch = useDispatch();
  const { logIn } = useAuth();
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });

  const handleChange = ({ target }) => {
    setErrors((prevState) => ({ ...prevState, [target.name]: null }));
    setForm({ [target.name]: target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = form;

    const checkedErrors = {
      email: isValidEmail(email) ? null : Errors.email,
      password: isValidPassword(password) ? null : Errors.password,
    };

    const isNotErrors = haveErrors(checkedErrors);

    if (isNotErrors) {
      try {
        const response = await axios.post(routes.loginPath(), {
          name: form.name,
          surname: form.surname,
          companyName: form.companyName,
          email: form.email,
          password: form.password,
          confirmPassword: form.repeatPassword,
        });
        localStorage.setItem('userId', response.data.token);
        dispatch(getSales());
        logIn();
      } catch (error) {
        const errorsInfo = error.response.data.errors;
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
      }
    } else {
      setErrors(checkedErrors);
    }
  };
  const isInvalidAccount = () => {
    if (errors.invalidAccount) {
      return errors.email || errors.password;
    }
    return true;
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
          {isInvalidAccount() || (
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
          <RouteLink to={Paths.signUp}>Create account</RouteLink>
        </div>
      </Form>
    </ContainerSignInAndSignUp>
  );
};

export default SignIn;
