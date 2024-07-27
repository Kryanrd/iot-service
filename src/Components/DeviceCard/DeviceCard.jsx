import styles from "./DeviceCard.module.css";
import React from 'react';
import { useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import SensorCard from "../SensorCard/SensorCard";


const DeviceCard = ({ onEditDevice, onDeleteDevice, onAddSensor, onEditSensor }) => {

    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <div className={styles.card} >
            <div className={styles.info}>
                <div className={styles.info__text}>
                    <h2 className={styles.info__text__name}>Устройство 1</h2>
                    <div className={styles.info__text__descr}>Описание Описание Описание Описание Описание</div>
                </div>
                <div className={styles["info__menu-box"]}>
                    <div
                        className={styles.menu}
                        onMouseEnter={() => setMenuVisible(true)}
                        onMouseLeave={() => setMenuVisible(false)}
                        onClick={toggleMenu}
                    >
                        <div className={styles.menu__btnbox}>
                            <button className={styles.menu__button}>
                                <MdMoreHoriz className={styles.icon} />
                            </button>
                        </div>
                        {menuVisible && (
                            <div className={styles.editMenu}>
                                <ul>
                                    <li onClick={onEditDevice}>Редактировать</li>
                                    <li onClick={onDeleteDevice}>Удалить</li>
                                    <li onClick={onAddSensor}>Добавить датчик</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles["sensors-list"]}>
                <SensorCard onEditSensor={onEditSensor}/>
                <SensorCard onEditSensor={onEditSensor}/>
                <SensorCard onEditSensor={onEditSensor}/>
            </div>
        </div>
    );
};

export default DeviceCard;