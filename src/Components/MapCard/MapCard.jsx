import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Stroke, Fill, Circle as CircleStyle } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Overlay from 'ol/Overlay';
import styles from "./MapCard.module.css";

import { FaMapMarkedAlt } from "react-icons/fa";

const calculateCenter = (devices) => {
    if (devices.length === 0) return [0, 0];

    let sumLat = 0;
    let sumLon = 0;

    devices.forEach(device => {
        sumLat += device.latitude;
        sumLon += device.longitude;
    });

    const avgLat = sumLat / devices.length;
    const avgLon = sumLon / devices.length;

    return [avgLon, avgLat];
};

const calculateZoom = (center, devices) => {
    if (devices.length === 0) return 12;

    let maxDistance = 0;

    devices.forEach(device => {
        const distance = Math.sqrt(
            Math.pow(device.latitude - center[1], 2) + Math.pow(device.longitude - center[0], 2)
        );
        if (distance > maxDistance) {
            maxDistance = distance;
        }
    });

    const zoom = Math.max(0, 12 - Math.log2(maxDistance + 1));

    return zoom;
};

const MapCard = ({ devices, onDeviceClick }) => {
    const mapElement = useRef();
    const popupElement = useRef();

    const [openMap, setOpenMap] = useState(false);

    useEffect(() => {
        if (!openMap) return;

        const center = calculateCenter(devices);
        const zoom = calculateZoom(center, devices);

        const features = devices.map(device => {
            const feature = new Feature({
                geometry: new Point(fromLonLat([device.longitude, device.latitude])),
                device: device
            });
            feature.setId(device.id);
            return feature;
        });

        const vectorSource = new VectorSource({
            features: features
        });

        const vectorLayer = new VectorLayer({
            source: vectorSource,
            style: new Style({
                image: new CircleStyle({
                    radius: 7,
                    fill: new Fill({ color: 'red' }),
                    stroke: new Stroke({ color: 'black', width: 2 })
                })
            })
        });

        const map = new Map({
            target: mapElement.current,
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat(center),
                zoom: zoom
            })
        });

        const overlay = new Overlay({
            element: popupElement.current,
            positioning: 'bottom-center',
            stopEvent: false,
            offset: [0, -10]
        });
        map.addOverlay(overlay);

        map.on('pointermove', (event) => {
            const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
            if (feature) {
                const coordinates = feature.getGeometry().getCoordinates();
                overlay.setPosition(coordinates);
                const device = feature.get('device');
                popupElement.current.innerHTML = device.name;
                popupElement.current.style.display = 'block';
                popupElement.current.style.padding = '4px';
                popupElement.current.style.borderRadius = '4px';
                popupElement.current.style.background = 'hsl(246 63% 45%)';
                popupElement.current.style.cursor = 'pointer';
            } else {
                popupElement.current.style.display = 'none';
            }
        });

        map.on('click', (event) => {
            const feature = map.forEachFeatureAtPixel(event.pixel, (feat) => feat);
            if (feature) {
                const device = feature.get('device');
                onDeviceClick(device);
            }
        });

        return () => {
            map.setTarget(null);
        };
    }, [devices, onDeviceClick, openMap]
    );

    const OpenMap = () => {
        if (devices.length === 0) setOpenMap(false);
        else setOpenMap(true);
    }

    return (
        <div className={styles.card}>
            <div className={styles.card__content}>
                <p className={styles.card__content__text}>Карта устройств</p>
                <div className={styles.card__content__map}>
                    {openMap ? (
                        <>
                            <div ref={mapElement} className={styles.map}></div>
                            <div ref={popupElement} className={styles.popup}></div>
                        </>
                    ) : (
                        <div className={`${styles.startcard} ${devices.length === 0 ? styles.nodevices : ''}`} onClick={() => OpenMap()}>
                            <div className={styles.startcard__content}>
                                <div className={styles.startcard__content__logo}>
                                    <FaMapMarkedAlt className={styles.icon} />
                                </div>
                                {devices.length === 0 ? (<div className={styles.startcard__content__text}>Устройства отсутствуют</div>) : (<div className={styles.startcard__content__text}>Открыть</div>)}
                                <div className={styles.startcard__content__descr}>
                                    Карта не стилизована под цветовую тему сайта
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MapCard;
