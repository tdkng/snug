import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent = ({ className = "h-full w-full" }) => {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      console.log('Initializing map...');
      console.log('MapTiler API Key:', import.meta.env.VITE_MAPTILER_API_KEY);
      
      mapInstance.current = L.map(mapRef.current).setView([40.7128, -74.0060], 13);

      const maptilerLayer = L.tileLayer(
        `https://api.maptiler.com/maps/streets-v2/256/{z}/{x}/{y}.png?key=${import.meta.env.VITE_MAPTILER_API_KEY}`,
        {
          attribution: '© <a href="https://www.maptiler.com/copyright/" target="_blank">MapTiler</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors',
          maxZoom: 20,
          tileSize: 256,
          zoomOffset: 0
        }
      );

      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
      });

      try {
        maptilerLayer.addTo(mapInstance.current);
        console.log('MapTiler layer added successfully');
      } catch (error) {
        console.error('Error adding MapTiler layer:', error);
        osmLayer.addTo(mapInstance.current);
        console.log('Using OpenStreetMap as fallback');
      }

      const sampleLocations = [
        { lat: 40.7128, lng: -74.0060, title: 'New York City' },
        { lat: 40.7589, lng: -73.9851, title: 'Times Square' },
        { lat: 40.6892, lng: -74.0445, title: 'Statue of Liberty' }
      ];

      sampleLocations.forEach(location => {
        L.marker([location.lat, location.lng])
          .addTo(mapInstance.current)
          .bindPopup(location.title);
      });

      const baseMaps = {
        "MapTiler Streets": maptilerLayer,
        "OpenStreetMap": osmLayer
      };

      L.control.layers(baseMaps).addTo(mapInstance.current);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return (
    <div className={className}>
      <div 
        ref={mapRef} 
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg shadow-lg"
      />
    </div>
  );
};

export default MapComponent;
