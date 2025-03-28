import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Homepage from './pages/HomePage.jsx'
import Pricing from './pages/Pricing.jsx'
import Product from './pages/Product.jsx'
import Login from './pages/Login.jsx'
import AppLayout from './pages/AppLayout.jsx'
import PageNotFound from './pages/PageNotFound.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<p>LIST</p>} />
          <Route path="cities" element={<p>Cities</p>} />
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
