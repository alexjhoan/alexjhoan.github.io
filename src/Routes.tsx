import { Route, Routes } from 'react-router'
import Dashboard from './views/Dashboard'
import Home from './views/Home'
import ProductDetails from './views/ProductDetails'
import Checkout from './views/Checkout'
import Cart from './views/Cart'

const RoutesComponent = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  )
}

export default RoutesComponent
