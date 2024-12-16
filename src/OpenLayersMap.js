import React, { useEffect } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

function OpenLayersMap() {
  useEffect(() => {
    // Инициализация карты OpenLayers
    const map = new Map({
      target: 'map', // элемент с id 'map'
      layers: [
        new TileLayer({
          source: new OSM(), // OpenStreetMap слой
        }),
      ],
      view: new View({
        center: [0, 0], // Центр карты (широта, долгота)
        zoom: 2, // Начальный зум
      }),
    });
  }, []);

  return <div id="map" style={{ height: '400px', width: '100%' }} />;
}

export default OpenLayersMap;
