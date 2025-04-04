import { createContext, useContext, useEffect, useState, useReducer, useCallback } from 'react'

const BASE_URL = 'http://localhost:8000'

const CityContext = createContext()

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
}

function reducer(state, action) {
  switch (action.type) {
    case 'loading':
      return { ...state, isLoading: true }
    case 'cities/loaded':
      return { ...state, isLoading: false, cities: action.payload }
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: action.payload }
    case 'city/created':
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload
      }
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {}
      }

    case 'rejected':
      return { ...state, isLoading: false, error: action.payload }
    default:
      throw new Error(`Unknown action type: ${action.type}`)
  }
}

function CityProvider({ children }) {
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: 'cities/loaded', payload: data })
      } catch (err) {
        dispatch({ type: 'rejected', payload: 'There was an error loading data...' })
      }
    }

    fetchCities()
  }, [])

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return

      dispatch({ type: 'loading' })
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`)
        const data = await res.json()
        dispatch({ type: 'city/loaded', payload: data })
      } catch (err) {
        dispatch({ type: 'rejected', payload: 'There was an error loading the city...' })
      }
    },
    [currentCity.id]
  )

  async function createCity(newCity) {
    dispatch({ type: 'loading' })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newCity)
      })
      const data = await res.json()
      dispatch({ type: 'city/created', payload: data })
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error creating the city...' })
    }
  }

  async function deleteCity(id) {
    dispatch({ type: 'loading' })
    try {
      await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE'
      })
      dispatch({ type: 'city/deleted', payload: id })
    } catch (error) {
      dispatch({ type: 'rejected', payload: 'There was an error deleting the city...' })
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
