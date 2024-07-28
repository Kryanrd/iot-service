import styles from "./DeviceCard.module.css";
import React, { useState } from 'react';
import { MdMoreHoriz } from "react-icons/md";
import SensorCard from "../SensorCard/SensorCard";

const DeviceCard = ({ device, onEditDevice, onDeleteDevice, onAddSensor, onEditSensor }) => {
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const sensorData = [
        { id: 1, value: 11.90, timestamp: "2024-07-27T18:50:00Z" },
        { id: 2, value: 11.76, timestamp: "2024-07-27T18:40:00Z" },
        { id: 3, value: 15.32, timestamp: "2024-07-27T18:30:00Z" },
        { id: 4, value: 7.50, timestamp: "2024-07-27T18:20:00Z" },
        { id: 5, value: 14.08, timestamp: "2024-07-27T18:10:00Z" },
        { id: 6, value: 14.44, timestamp: "2024-07-27T18:00:00Z" }
    ];
    
    

    const sensors = [
        { id: 1, name: "Датчик 1", description: "Описание датчика 1" },
        { id: 2, name: "Датчик 2", description: "Описание датчика 2" },
        { id: 3, name: "Датчик 3", description: "Описание датчика 3" }
    ];

    return (
        <div className={styles.card}> 
            <div className={styles.info}>
                <div className={styles.info__text}>
                    <h2 className={styles.info__text__name}>{device.name}</h2>
                    <div className={styles.info__text__descr}>{device.description}</div>
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
                {sensors.map(sensor => (
                    <SensorCard 
                        key={sensor.id} 
                        sensor={sensor} 
                        sensorData={sensorData} 
                        onEditSensor={onEditSensor} 
                    />
                ))}
            </div>
        </div>
    );
};

export default DeviceCard;
