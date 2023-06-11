import React, { useEffect, useState } from "react";
import "./map.page.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
} from "react-leaflet";

import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { LocationService } from "../../services/location.service";
import { useNavigate } from "react-router-dom";
import { Location } from "../../models/location.model";
import { useTranslation } from 'react-i18next';

const customIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
});

const MapPage = () => {
  const [locations, setLocationList] = useState<Location[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const {t} = useTranslation();

  useEffect(() => {
    const getLocations = async () => {
      LocationService.getLocations()
        .then((response) => {
          setLocationList(response.data);
        })
        .catch((error) => {
          navigate("*");
        });
    };
    getLocations();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=json`
      );
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const MapComponent = () => {
    const map = useMap();

    const handleSearchResult = (result: {
      lat: any;
      lon: any;
      importance: any;
    }) => {
      const { lat, lon, importance } = result;
      const zoom = calculateZoom(importance);
      map.flyTo([parseFloat(lat), parseFloat(lon)], zoom);
    };

    const calculateZoom = (importance: number) => {
      return Math.floor(18 - Math.log2(importance));
    };

    useEffect(() => {
      if (searchResults.length > 0) {
        handleSearchResult(searchResults[0]);
      }
    }, [searchResults]);

    return (
      <>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((location) => (
          <Marker
            key={location.uuid}
            position={[
              parseFloat(location.latLocation),
              parseFloat(location.lonLocation),
            ]}
            icon={customIcon}
          >
            <Tooltip>{location.nameLocation}</Tooltip>
            <Popup>{location.descriptionLocation}</Popup>
          </Marker>
        ))}

        {searchResults.map((result: any, index: number) => (
          <Marker
            key={index}
            position={[parseFloat(result.lat), parseFloat(result.lon)]}
            eventHandlers={{
              click: () => handleSearchResult(result),
            }}
          >
            <Popup>{result.display_name}</Popup>
          </Marker>
        ))}
      </>
    );
  };

  return (
    <div>
      <Navbar />
      <div>
        <div>
          <input
            type="text"
            placeholder="Buscar lugares"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>{t("Search")}</button>
        </div>
        <MapContainer
          center={[41.3807, 2.1158]}
          zoom={13}
          style={{ height: "800px", width: "100%" }}
        >
          <MapComponent />
        </MapContainer>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
