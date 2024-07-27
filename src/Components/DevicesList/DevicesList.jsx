import styles from "./DevicesList.module.css";
import React from 'react';
import { MdOutlinePlaylistAdd } from "react-icons/md";

const DevicesList = ({ onAddDevice }) => {

    const devices = [
        { id: 1, name: "Устройство 1", description: "Описание устройства 1", latitude: 55.7558, longitude: 37.6173 },
        { id: 2, name: "Устройство 2", description: "Описание устройства 2", latitude: 55.7510, longitude: 37.5586 },
        { id: 3, name: "Устройство 3", description: "Описание устройства 3", latitude: 55.7300, longitude: 37.6430 },
        { id: 4, name: "Устройство 4", description: "Описание устройства 4", latitude: 55.7400, longitude: 37.6200 },
        { id: 5, name: "Устройство 5", description: "Описание устройства 5", latitude: 55.7520, longitude: 37.6150 },
    ];

    return (
        <div className={styles.card}>
            <div className={styles.card__label}>
                <h2 className={styles.card__label__text}>ALL DEVICES</h2>
            </div>
            <div className={styles.card__list} id={styles.element}>
                {devices.map(device => (
                    <button key={device.id} className={styles.item}>
                        <p className={styles.item__name}>{device.name}</p>
                        {/* <p className={styles.item__description}>{device.description}</p>
                        <p className={styles.item__coords}>
                            Широта: {device.latitude}, Долгота: {device.longitude}
                        </p> */}
                    </button>
                ))}
            </div>
            <div className={styles.card__info}>
                <div className={styles.card__info__text}>{devices.length} устройств</div>
                <button className={styles.card__info__btn} onClick={onAddDevice}>
                    <MdOutlinePlaylistAdd className={styles.icon} />
                </button>
            </div>
        </div>
    );
};

export default DevicesList;
