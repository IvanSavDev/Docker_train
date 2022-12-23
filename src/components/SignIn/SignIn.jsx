import React from 'react';

import styles from './SignIn.module.css';
function SignIn() {
    return (
        <div className={styles.container}>
            <div className={styles.containerForm}>
                <form className={styles.form}>
                    <h1 className={styles.title}>Sign in</h1>
                    <div className={styles.containerEmail}>
                        <h2 className={styles.fieldName}>Email</h2>
                        <input type="email" className={styles.field} placeholder="Email" />
                    </div>
                    <div className={styles.containerPassword}>
                        <h2 className={styles.fieldName}>Password</h2>
                        <input type="email" className={styles.field} placeholder="Enter password" />
                    </div>
                    <button type="submit" className={styles.submitButton}>Log in</button>
                    <a href="/#" className={styles.forgotPassword}>Forgot password?</a>
                </form>
            </div>
            <div className={styles.backgroundImg}></div>
        </div>
    );
}

export default SignIn;