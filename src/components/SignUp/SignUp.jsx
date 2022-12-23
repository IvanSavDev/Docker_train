import React from 'react';

import ContainerSignInAndSignUp from '../ContainerSignInAndSignUp';
import InputWithTitle from "../Inputs/InputWithTitle";
import Button from "../Buttons/Button";
import Form from "../Form/Form";
import RouteLink from "../RouteLink/RouteLink";

import styles from './SignUp.module.css';

function SignIn() {
    return (
        <ContainerSignInAndSignUp>
            <Form formName="Create an account">
                <div className={styles.fullName}>
                    <InputWithTitle type="text" placeholder="First name" titleName="First name" />
                    <InputWithTitle type="text" placeholder="Last name" titleName="Last name" />
                </div>
                <div className={styles.containerInput}>
                    <InputWithTitle type="text" placeholder="Company name" titleName="Company name" />
                </div>
                <div className={styles.containerInput}>
                    <InputWithTitle type="email" placeholder="Email" titleName="Email" />
                </div>
                <div className={styles.containerInput}>
                    <InputWithTitle type="password" placeholder="Enter password" titleName="Password" />
                </div>
                <div className={styles.containerPassword}>
                    <InputWithTitle type="password" placeholder="Repeat password" titleName="Repeat password" />
                </div>
                <Button type="submit">Create account</Button>
            </Form>
            <div>
                <span>Already have an account? </span>
                <RouteLink href="/#">Log in</RouteLink>
            </div>
        </ContainerSignInAndSignUp>
    );
}

export default SignIn;