import styles from "./DeleteDeviceDialog.module.css";
import React from 'react';
import Dialog from "../Dialog/Dialog";

const DeleteDeviceDialog = ({ onClose }) => {

    return (
        <>
            <Dialog>
                <div className={styles.content}>
                    <h2 className={styles.content__label}>Удалить устройство</h2>
                    <div className={styles["content__btn-box"]}>
                        <button className={styles.button} onClick={onClose}>Отмена</button>
                        <button
                            className={styles.button}>Удалить</button>
                    </div>
                </div>
            </Dialog>
        </>
    );
};

export default DeleteDeviceDialog;
