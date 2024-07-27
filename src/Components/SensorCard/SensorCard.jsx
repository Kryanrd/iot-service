import styles from "./SensorCard.module.css";
import React from 'react';
import { MdModeEdit } from "react-icons/md";
import { MdExpandMore } from "react-icons/md";


const SensorCard = ({ onEditSensor }) => {

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.content__text}>
                    <h2 className={styles.content__text__name}>Датчик 1</h2>
                    <div className={styles.content__text__descr}>Описание Описание Описание Описание Описание</div>
                </div>
                <div className={styles.content__info}>
                    <div className={styles.content__info__table}></div>
                    <div className={styles.content__info__timetable}></div>
                </div>
            </div>
            <div className={styles["btn-box"]}>
                    <button onClick={onEditSensor} className={styles["btn-box__button"]}>
                        <MdModeEdit className={styles.icon}/>
                    </button>
                    <button className={styles["btn-box__button"]}>
                        <MdExpandMore className={styles.icon}/>
                    </button>
                </div>
        </div>
    );
};

export default SensorCard;