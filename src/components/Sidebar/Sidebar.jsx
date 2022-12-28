import React from 'react';
import {NavLink} from "react-router-dom";

import {Paths} from "../../consts/consts";
import {ReactComponent as Home} from "../../assets/img/home.svg";
import {ReactComponent as MyProduct} from "../../assets/img/doc.svg";
import {ReactComponent as MySales} from "../../assets/img/percent.svg";
import {ReactComponent as PersonalCabinet} from "../../assets/img/user.svg";
import {ReactComponent as LogOut} from "../../assets/img/logOut.svg";
import useAuth from "../../hooks/useAuth";

import styles from './Sidebar.module.css'

const Sidebar = () => {
    const {logOut} = useAuth();

    return (
        <div className={styles.container}>
            <div className={styles.wrapperPadding}>
                <div className={styles.background}></div>
            </div>
            <div className={styles.wrapper}>
                <NavLink to={Paths.base} className={({isActive}) => isActive ? styles.active : styles.noActive}>
                    <Home className={styles.activeLogo}/>
                    Main page
                </NavLink>
                <NavLink to={Paths.myProduct} className={({isActive}) => isActive ? styles.active : styles.noActive}>
                    <MyProduct className={styles.activeLogo}/>
                    My products
                </NavLink>
                <NavLink to={Paths.mySales} className={({isActive}) => isActive ? styles.active : styles.noActive}>
                    <MySales className={styles.activeLogo}/>
                    My sales
                </NavLink>
                <NavLink to={Paths.personalCabinet}
                         className={({isActive}) => isActive ? styles.active : styles.noActive}>
                    <PersonalCabinet className={styles.activeLogo}/>
                    Personal cabinet
                </NavLink>
            </div>
            <div className={styles.wrapperPadding}>
                <div className={styles.wrapperButton}>
                    <button type="button" className={styles.button} onClick={logOut}>
                        <LogOut/>
                        Log out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;