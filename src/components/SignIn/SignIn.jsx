import React from 'react';

import styles from './SignIn.module.css';
function SignIn() {
    return (
        <div className={styles.container}>
            <div>
                <h1 className={styles.title}>Sign in</h1>
                <div>
                    <h2>Email</h2>
                    <input type="email"/>
                </div>
                <div>
                    <h2>Email</h2>
                    <input type="email"/>
                </div>
            </div>
        </div>
    );
}

export default SignIn;