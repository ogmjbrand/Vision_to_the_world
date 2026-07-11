"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { officeLocation } from "@/lib/data/office-location";
import { siteConfig, fullAddress } from "@/lib/data/site-config";

const officeIcon = new L.Icon({
  iconUrl: "/leaflet/marker-icon.png",
  iconRetinaUrl: "/leaflet/marker-icon-2x.png",
  shadowUrl: "/leaflet/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function OfficeMap() {
  const position: [number, number] = [officeLocation.lat, officeLocation.lng];

  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={officeIcon}>
        <Popup>
          <p className="font-semibold">{siteConfig.name}</p>
          <p>{fullAddress}</p>
        </Popup>
      </Marker>
    </MapContainer>
  );
}
