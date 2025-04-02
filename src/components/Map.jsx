import { useSearchParams, useNavigate } from 'react-router-dom'
import styles from './Map.module.css'
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import { useCity } from '../contexts/CityContext'
import { useEffect, useState } from 'react'
import { useGeolocation } from '../hooks/useGeolocation'
import Button from './Button'
import { useUrlPosition } from '../hooks/useUrlPosition'

export default function Map() {
  const { cities } = useCity()
  const [mapPosition, setMapPosition] = useState([40, 0])
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition
  } = useGeolocation()

  const mapZoom = 10
  const [mapLat, mapLng] = useUrlPosition()

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng])
  }, [mapLat, mapLng])

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }
  }, [geolocationPosition])

  return (
    <div className={styles.mapContainer}>
      {!geolocationPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? 'Loading...' : 'Use your position'}
        </Button>
      )}

      <MapContainer
        center={mapPosition}
        zoom={mapZoom}
        scrollWheelZoom={true}
        className={styles.map}
      >
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

        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  )
}

function ChangeCenter({ position }) {
  const map = useMap()
  map.setView(position)
  return null
}

function DetectClick() {
  const navigate = useNavigate()
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng
      navigate(`form/?lat=${lat}&lng=${lng}`)
    }
  })
  return null
}
