import styles from "./AddSensorDialog.module.css";
import React, { useState } from 'react';
import Dialog from "../Dialog/Dialog";

const AddSensorDialog = ({ onClose }) => {
    const [formData, setFormData] = useState(
        {
            name: "",
            descr: ""
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    return (
        <>
            <Dialog>
                <div className={styles.content}>
                    <h2 className={styles.content__label}>Добавить новый датчик</h2>
                    <form className={styles.content__form}>
                        <label className={styles.form__label} htmlFor="name">Название</label>
                        <input
                            className={styles["form__input-box__input"]}
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder='Введите название устройства'
                        />
                        <label className={styles.form__label} htmlFor="descr">Описание</label>
                        <textarea
                            className={styles["form__input-box__textarea"]}
                            name="descr"
                            id="descr"
                            value={formData.descr}
                            onChange={handleChange}
                            placeholder='Введите описание устройства'
                            rows="3"
                        />
                    </form>
                    <div className={styles["content__btn-box"]}>
                        <button className={styles.button} onClick={onClose}>Отмена</button>
                        <button
                            className={styles.button}
                            disabled={!formData.name || !formData.descr}
                        >Сохранить</button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default AddSensorDialog;
