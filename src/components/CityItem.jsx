import { Link } from 'react-router-dom'
import styles from './CityItem.module.css'
import { useCity } from '../contexts/CityContext'

const formatDate = (date) =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date))

export default function CityItem({ city }) {
  const { currentCity, deleteCity } = useCity()
  const { cityName, emoji, date, id, position } = city

  function handleClick(e) {
    e.preventDefault()
    e.stopPropagation()
    const message = `Are you sure you want to delete ${cityName}?`
    if (window.confirm(message)) deleteCity(id)
  }

  return (
    <li>
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${currentCity.id === id ? styles['cityItem--active'] : ''}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  )
}
