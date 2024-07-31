import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import styles from "./Login.module.css";

const Login = ({ onLogin, onLogout }) => {
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState({ name: "", password: "" });
    const [errors, setErrors] = useState({ name: false, password: false });
    const navigate = useNavigate();

    useEffect(() => {
        onLogout(); // Сброс авторизации при переходе на страницу логина
      }, [onLogout]);

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
            onLogin();
            navigate('/devices');
        } else {
            setErrors({
                name: !formData.name,
                password: !formData.password
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.logo}>Iot Service</h1>
                <h2 className={styles.label}>Вход</h2>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label className={styles.form__label} htmlFor="name">Имя</label>
                    <input
                        className={styles["form__input-box__input"]}
                        type="text"
                        name="name"
                        id="name"
                        placeholder='Имя пользователя'
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <p className={`${styles.form__error} ${errors.name ? styles.show : ''}`}>Name is required</p>
                    <label className={styles.form__label} htmlFor="password">Пароль</label>
                    <div className={styles["form__input-box"]}>
                        <input
                            className={styles["form__input-box__input"]}
                            value={formData.password}
                            type={visible ? "text" : "password"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            name="password"
                            id="password"
                            placeholder='Пароль'
                        />
                        <div className={styles["form__input-box__icon"]} onClick={() => setVisible(!visible)}>
                            {visible ? <IoMdEye className={styles.icon}/> : <IoMdEyeOff className={styles.icon}/>}
                        </div>
                    </div>
                    <p className={`${styles.form__error} ${errors.password ? styles.show : ''}`}>Password is required</p>
                    <button className={styles.button} disabled={!formData.name || !formData.password}>Войти</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
