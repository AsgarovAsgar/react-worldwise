import styles from './CountryList.module.css'
import Spinner from './Spinner'
import CountryItem from './CountryItem'
import Message from './Message'

import { useCity } from '../contexts/CityContext.jsx'

export default function CountryList() {
  const { cities, isLoading } = useCity()

  if (isLoading) return <Spinner />

  if (!cities.length)
    return <Message message="Add your first country by clicking on a country on the map" />

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { country: city.country, emoji: city.emoji }]
    } else {
      return arr
    }
  }, [])

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.country} country={country} />
      ))}
    </ul>
  )
}
