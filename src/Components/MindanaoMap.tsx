import React, { useState, useEffect } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MindanaoMap.css";

const MindanaoMap: React.FC = () => {
  const [geoJsonData, setGeoJsonData] = useState(null);

  useEffect(() => {
    fetch("./gadm41_PHL_1.json")
      .then((response) => response.json())
      .then((data) => {
        setGeoJsonData(data);
      })
      .catch((error) => console.error("Error loading GeoJSON:", error));
  }, []);

  const mindanaoRegions = [
    // ZAMBOANGA PENINSULA (Region IX)
    "ZamboangadelNorte",
    "ZamboangadelSur",
    "ZamboangaSibugay",
    // NORTHERN MINDANAO (Region X)
    "Bukidnon",
    "Camiguin",
    "LanaodelNorte",
    "MisamisOccidental",
    "MisamisOriental",
    // DAVAO REGION (Region XI)
    "DavaodelNorte",
    "DavaodelSur",
    "DavaoOriental",
    "CompostelaValley",
    // SOCCSKSARGEN (Region XII)
    "NorthCotabato",
    "SouthCotabato",
    "SultanKudarat",
    "Sarangani",
    // CARAGA (Region XIII)
    "AgusandelNorte",
    "AgusandelSur",
    "SurigaodelNorte",
    "SurigaodelSur",
    "DinagatIslands",
    // BARMM
    "LanaodelSur",
    "Maguindanao",
    "Basilan",
    "Sulu",
    "Tawi-Tawi",
  ];

  const onEachFeature = (feature: any, layer: L.Layer) => {
    const regionName = feature.properties.NAME_1;

    const isMindanao = mindanaoRegions.includes(regionName);

    layer.setStyle({
      color: isMindanao ? "#FF0000" : "#808080",
      weight: isMindanao ? 2 : 1,
      fillColor: isMindanao ? "transparent" : "#808080",
      fillOpacity: isMindanao ? 0 : 0.6,
    });
  };

  return (
    <div className="map-container">
      <MapContainer
        center={[8.0, 125.0]}
        zoom={7}
        style={{ width: "100%", height: "500px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {geoJsonData && (
          <GeoJSON data={geoJsonData} onEachFeature={onEachFeature} />
        )}
      </MapContainer>
    </div>
  );
};

export default MindanaoMap;