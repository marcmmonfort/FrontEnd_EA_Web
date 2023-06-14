import React, { useEffect, useState } from "react";
import "./map.page.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  Tooltip,
  useMap,
  useMapEvents,
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
import { useTranslation } from "react-i18next";

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
  const [searchOptions, setSearchOptions] = useState<any[]>([]);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [marker, setMarker] = useState<any>(null);
  const [locationInfo, setLocationInfo] = useState<any>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

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

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${searchValue}&format=json`
      );
      const data = await response.json();
      setSearchResults(data);
      setSearchOptions(data.slice(0, 5)); // Obtener las primeras 5 opciones de búsqueda
    } catch (error) {
      console.error("Error en la búsqueda:", error);
    }
  };

  const MapComponent = ({ selectedOption }: { selectedOption: any }) => {
    const mapInstance = useMap();
  
    const handleMapClick = async (e: any) => {
      const { lat, lng } = e.latlng;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      setLocationInfo(data);
      setMarker({ lat, lng });
      setSelectedOption({
        lat: lat,
        lon: lng,
        importance: 2, 
      });
    };
  
    const map = useMapEvents({
      locationfound: (location) => {
        mapInstance.flyTo(location.latlng, mapInstance.getZoom());
      },
      click: handleMapClick,
    });
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
      return Math.floor(15 - Math.log2(importance));
    };

    useEffect(() => {
      if (selectedOption) {
        handleSearchResult(selectedOption);
      }
    }, [selectedOption]);

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
            icon={customIcon}
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

  const getUserLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setSelectedOption({
            lat: latitude,
            lon: longitude,
            importance: 2, 
          });
        },
        (error) => {
          console.error("Error al obtener la ubicación del usuario:", error);
        }
      );
    } else {
      console.error("Geolocalización no es compatible en este navegador.");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="map-page-container">
      <Navbar />
      <div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Buscar lugares"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          <button onClick={handleSearch}>{t("Search")}</button>
        </div>

        {/* Mostrar las opciones de búsqueda */}
        {searchOptions.length > 0 && (
          <ul className="search-results">
            {searchOptions.map((option, index) => (
              <li
                className="searchResults"
                key={index}
                onClick={() => setSelectedOption(option)}
              >
                {option.display_name}
              </li>
            ))}
          </ul>
        )}

        <MapContainer
          center={[41.3807, 2.1158]}
          zoom={12}
          style={{ height: "800px", width: "100%" }}
        >
          <MapComponent selectedOption={selectedOption} />
          {marker && (
            <Marker position={marker} icon={customIcon}>
              <Popup>
                <div>
                  <strong>Direction:</strong> {locationInfo?.display_name}
                </div>
                <div>
                  <strong>Latitude:</strong> {marker?.lat}
                </div>
                <div>
                  <strong>Longitude:</strong> {marker?.lng}
                </div>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
      <Footer />
    </div>
  );
};

export default MapPage;
