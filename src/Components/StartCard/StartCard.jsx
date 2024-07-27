import styles from "./StartCard.module.css";
import React from 'react';


const StartCard = () => {

    return (
        <div className={styles.card}>
            <div className={styles.card__content}>
                <h2 className={styles.card__content__text}>Выберите устройство из списка</h2>
                <p className={styles.card__content__descr}>Воспользуйтесь списком устройств в левой части страницы</p>
            </div>
        </div>
    );
};

export default StartCard;