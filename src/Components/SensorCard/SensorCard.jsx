import styles from "./SensorCard.module.css";
import React, { useState } from 'react';
import { MdModeEdit, MdExpandMore, MdExpandLess } from "react-icons/md";
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

const SensorCard = ({ sensor, sensorData, onEditSensor }) => {
    const [expanded, setExpanded] = useState(false);

    // Сортируем sensorData по возрастанию времени
    const sortedData = sensorData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    // Получаем начальное и конечное время
    const startTime = new Date(sortedData[0].timestamp).toLocaleString();
    const endTime = new Date(sortedData[sortedData.length - 1].timestamp).toLocaleString();

    // Подготовка данных для графика
    const chartData = {
        labels: sortedData.map(data => new Date(data.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })),
        datasets: [
            {
                label: '', 
                data: sortedData.map(data => data.value.toFixed(2)),
                fill: false,
                borderColor: 'hsl(27, 28%, 55%)',
                tension: 0.1
            }
        ]
    };

    // Опции для графика
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: 'hsl(26, 35%, 36%)', // Цвет вертикальных линий сетки
                },
                ticks: {
                    color: 'hsl(27, 28%, 55%)', // Цвет подписей оси X
                }
            },
            y: {
                grid: {
                    color: 'hsl(26, 35%, 36%)', // Цвет горизонтальных линий сетки
                },
                ticks: {
                    color: 'hsl(27, 28%, 55%)', // Цвет подписей оси Y
                }
            }
        },
        plugins: {
            legend: {
                display: false, // Отключаем отображение легенды
            },
            title: {
                display: false // Отключаем заголовок графика
            },
        }
    };

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={styles.card}>
            <div className={styles.content}>
                <div className={styles.content__text}>
                    <h2 className={styles.content__text__name}>{sensor.name}</h2>
                </div>
                <div className={`${styles.content__info} ${expanded ? styles.expanded : ''}`}>
                    <div className={styles.content__text__descr}>{sensor.description}</div>
                    <div className={styles.tables}>
                        <div className={styles.content__info__table}>
                            <table className={styles.table}>
                                <thead>
                                    <tr>
                                        <th colSpan={sortedData.length + 1}>
                                            Период от {startTime} до {endTime}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th className={styles.vertical}>Время</th>
                                        {sortedData.map((data, index) => (
                                            <th key={index}>
                                                {new Date(data.timestamp).getHours()}:{new Date(data.timestamp).getMinutes().toString().padStart(2, '0')}
                                            </th>
                                        ))}
                                    </tr>
                                    <tr>
                                        <th className={styles.vertical}>Значение</th>
                                        {sortedData.map(data => (
                                            <th key={data.id}>{data.value.toFixed(2)}</th>
                                        ))}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className={styles.content__info__timetable}>
                            <Line data={chartData} options={chartOptions} />
                        </div>
                    </div>

                </div>
            </div>
            <div className={styles["btn-box"]}>
                <button onClick={() => onEditSensor(sensor)} className={`${styles["btn-box__button"]} ${expanded ? styles.expandedButton : styles.noExpandedButton}`}>
                    <MdModeEdit className={styles.icon} />
                </button>
                <button className={styles["btn-box__button"]} onClick={toggleExpand}>
                    {expanded ? <MdExpandLess className={styles.icon} /> : <MdExpandMore className={styles.icon} />}
                </button>
            </div>
        </div>
    );
};

export default SensorCard;
