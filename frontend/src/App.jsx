import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import UserProfile from "./pages/UserProfile";
import Men from "./pages/Men";
import Women from "./pages/Women";
import Kids from "./pages/Kids";
import ProductDetails from './pages/ProductDetails';
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Order from "./pages/Order";
import Orders from "./pages/Orders";
import Favorite from "./pages/Favorite";
import WorkShop from "./pages/WorkShop";
import WorkshopDetails from "./pages/WorkshopDetails";
import WorkForm from "./pages/WorkshopRegistrationForm";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
function Layout() {
  const location = useLocation();
  const hideNavbarPages = ["/register", "/login", "/dashboard"];
  return (
    <>
    {!hideNavbarPages.includes(location.pathname) && <Navbar />}
    <Routes> 
    <Route path="/login" element={<Login/>} />
    <Route path="/register" element={<Register/>} />
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<UserProfile/>}/>
       <Route path="/men" element={<Men />} /> 
       <Route path="/women" element={<Women/>} />
       <Route path="/kids" element={<Kids/>}/>
       <Route path="/product/:id" element={<ProductDetails />} />
       <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order" element={<Order />} />
        <Route path="/favorites" element={<Favorite/>} />
        <Route path="/orders" element={<Orders/>}/>
       <Route path="/workshop" element={<WorkShop/>}/>
       <Route path="/workshops/:id" element={<WorkshopDetails/>} />
       <Route path="/workshopForm/:id" element={<WorkForm/>}/>
       <Route path="/dashboard/*" element={<Dashboard/>}/>
       <Route path="/about" element={<About/>}/>
       <Route path="/contact" element={<Contact/>}/>

    </Routes>
    {!hideNavbarPages.includes(location.pathname) && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
