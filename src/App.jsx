import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Homepage from './pages/HomePage.jsx'
import Pricing from './pages/Pricing.jsx'
import Product from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import AppLayout from './pages/AppLayout.jsx'
import PageNotFound from './pages/PageNotFound.jsx'
import CityList from './components/CityList.jsx'
import CountryList from './components/CountryList.jsx'
import City from './components/City.jsx'
import Form from './components/Form.jsx'
import { CityProvider } from './contexts/CityContext.jsx'
import { AuthProvider } from './contexts/FakeAuthContext.jsx'

export default function App() {
  return (
    <AuthProvider>
      <CityProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/product" element={<Product />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </CityProvider>
    </AuthProvider>
  )
}
