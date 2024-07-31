import React from 'react';
import styles from "./DevicesListItem.module.css";

const DevicesListItem = ({ device, isActive, onDeviceClick }) => {
    return (
        <button
            className={`${styles.item} ${isActive ? styles.active : ''}`}
            onClick={() => onDeviceClick(device)}
        >
            <p className={styles.item__name}>{device.name}</p>
        </button>
    );
};

export default DevicesListItem;
