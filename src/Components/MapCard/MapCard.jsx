import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { Style, Icon, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import { bbox as bboxStrategy } from 'ol/loadingstrategy';
import styles from "./MapCard.module.css";

const MapCard = () => {
    useEffect(() => {
        const points = [
            [37.6173, 55.7558], // Red Square
            [37.5586, 55.7510], // Luzhniki Stadium
            [37.6430, 55.7300]  // Gorky Park
        ];

        const features = points.map(point => new Feature({
            geometry: new Point(fromLonLat(point))
        }));

        const vectorSource = new VectorSource({
            features: features,
            strategy: bboxStrategy
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
            target: 'map',
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            view: new View({
                center: fromLonLat([37.6173, 55.7558]),
                zoom: 12
            })
        });

        // Fit the map view to the extent of the vector layer
        map.getView().fit(vectorSource.getExtent(), { padding: [50, 50, 50, 50] });

        return () => {
            map.setTarget(null);
        };
    }, []);

    return (
        <div className={styles.card}>
            <div className={styles.card__content}>
                <p className={styles.card__content__text}>Карта датчиков</p>
                <div className={styles.card__content__map}>
                    <div id="map" className={styles.map}></div>
                </div>
            </div>
        </div>
    );
};

export default MapCard;
