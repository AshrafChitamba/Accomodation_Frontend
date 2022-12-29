import "react-toastify/dist/ReactToastify.css";
// import './App.css';
import Aos from "aos";
import "aos/dist/aos.css";
import "./assets/css/fontawesome.css";
import "./assets/css/style.css";
import "./assets/css/owl.css";
import Header from "./Components/common/Header";
import Footer from "./Components/common/Footer";
import Home from "./Components/pages/Home";
import Landowners from "./Components/Agents/Agent";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Contact from "./Components/pages/Contact";
import Hostels from "./Components/pages/Hostels";
import About from "./Components/pages/About";
import AuthWrapper from "./Components/Auth/AuthWrapper";
import SmileGardens from "./Components/hostel/SmileGardens";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import { useEffect } from "react";
import StaticWrapper from "./Components/StaticWrapper";

function App() {
  useEffect(() => {
    Aos.init({ duration: 800, delay: 10 });
  }, []);

  return (
    <div className="container-fluid p-0 m-0">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StaticWrapper />}>
            <Route path="" element={<Home />} />
            <Route path="aboutus" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="auth" element={<AuthWrapper />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route path="about" element={<About />} />
            <Route path="hostels" element={<Hostels />} />
            <Route path="smileGardens" element={<SmileGardens />} />
          </Route>
          <Route path="/agents/:id" element={<Landowners />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
