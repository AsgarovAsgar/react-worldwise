import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { useCity } from '../contexts/CityContext'
import { useState } from 'react'

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { cities } = useCity()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  const navigate = useNavigate()
  const [mapPosition, useMapPosition] = useState([51.505, -0.09])

  return (
    <div className={styles.mapContainer}>
      <MapContainer center={mapPosition} zoom={13} scrollWheelZoom={true} className={styles.map}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />

        {cities.map(({ id, position, cityName, emoji }) => {
          return (
            <Marker position={position} key={id}>
              <Popup>
                <span>{emoji}</span>
                <span>{cityName}</span>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
