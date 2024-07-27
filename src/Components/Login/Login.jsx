import React, { useState } from 'react';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./Login.module.css";

const Login = () => {
    const [islogin, setLogin] = useState(false);

    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [errors, setErrors] = useState({ name: false, password: false });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        if (value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: false,
            }));
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        if (!value) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: true,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.password) {
            setLogin(true);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.logo}>Iot Service</div>
                <h2 className={styles.label}>Login</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.form__label} htmlFor="name">Name</label>
                    <input
                        className={styles["form__input-box__input"]}
                        type="text"
                        name="name"
                        id="name"
                        placeholder='Username'
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <p className={`${styles.form__error} ${errors.name ? styles.show : ''}`}>Name is required</p>
                    <label className={styles.form__label} htmlFor="password">Password</label>
                    <div className={styles["form__input-box"]}>
                        <input
                            className={styles["form__input-box__input"]}
                            value={formData.password}
                            type={visible ? "text" : "password"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            id="password"
                            placeholder='Password'
                        />
                        <div className={styles["form__input-box__icon"]} onClick={() => setVisible(!visible)}>
                            {visible ? <IoMdEye className={styles.icon}/> : <IoMdEyeOff className={styles.icon}/>}
                        </div>
                    </div>
                    <p className={`${styles.form__error} ${errors.password ? styles.show : ''}`}>Password is required</p>
                    <button className={styles.button} disabled={!formData.name || !formData.password}>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;