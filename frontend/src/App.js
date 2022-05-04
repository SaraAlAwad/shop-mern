
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AllProducts from './pages/AllProducts';
import ProductDetails from './pages/ProductDetails';
import AddProduct from './pages/AddProduct';
import { Login } from './pages/Login';
import { useState } from 'react';
import Registration from './pages/Registration';
import EditProduct from './pages/EditProduct';

function App() {
  const [token, setToken] = useState(null)
  // const logout = () => setToken(null)
  console.log("token:", token);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/AllProducts' element={<AllProducts />} />
          <Route path='products/productDetails/:productId' element={<ProductDetails />} />
          <Route path='/addProduct' element={<AddProduct token={token} />} />
          {console.log("token", token)}
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/register' element={<Registration />} />
          <Route path="/editproduct" element={<EditProduct />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
