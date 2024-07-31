import styles from "./StartCard.module.css";
import React from 'react';

const StartCard = ({devices}) => {

    return (
        <div className={styles.card}>
            {devices.length === 0 ? (
                <div className={styles.card__content}>
                <h2 className={styles.card__content__text}>Устройства отсутствуют</h2>
                <p className={styles.card__content__descr}>Воспользуйтесь кнопкой добавления устройств в левой части страницы</p>
            </div>
            ) : (
                <div className={styles.card__content}>
                <h2 className={styles.card__content__text}>Выберите устройство из списка</h2>
                <p className={styles.card__content__descr}>Воспользуйтесь списком устройств в левой части страницы</p>
            </div>
            ) }
        </div>
    );
};

export default StartCard;