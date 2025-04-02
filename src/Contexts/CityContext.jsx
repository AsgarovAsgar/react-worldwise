import { createContext, useContext, useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const CityContext = createContext()

function CityProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch (error) {
        console.error('An error occurred while fetching cities:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
    } catch (error) {
      console.error('An error occurred while fetching cities:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCity)
      })
      const data = await res.json()
      setCities((cities) => [...cities, data])
    } catch (error) {
      console.error('An error occurred while creating the city:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true)
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      setCities((cities) => cities.filter((city) => city.id !== id))
    } catch (error) {
      console.error('An error occurred while deleting the city:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CityContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity, deleteCity }}
    >
      {children}
    </CityContext.Provider>
  )
}

function useCity() {
  const context = useContext(CityContext)
  if (!context) {
    throw new Error('useCity must be used within a CityProvider')
  }
  return context
}

export { CityProvider, useCity }
