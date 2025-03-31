import { createContext, useContext, useEffect, useState } from 'react'

const BASE_URL = 'http://localhost:8000'

const CityContext = createContext()

function CityProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)

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

  return <CityContext.Provider value={{ cities, isLoading }}>{children}</CityContext.Provider>
}

function useCity() {
  const context = useContext(CityContext)
  if (!context) {
    throw new Error('useCity must be used within a CityProvider')
  }
  return context
}

export { CityProvider, useCity }
