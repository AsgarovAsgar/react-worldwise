import { useNavigate, useSearchParams } from 'react-router-dom'
import styles from './Map.module.css'

export default function Map() {
  const [searchParams, setSearchParams] = useSearchParams()
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  const navigate = useNavigate()

  return (
    <div className={styles.mapContainer}>
      <h2>Map</h2>
      <p>Latitude: {lat}</p>
      <p>Longitude: {lng}</p>

      <button onClick={() => navigate('form')}>go to form</button>
    </div>
  )
}
