import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import ToursList from './pages/ToursList';
import TourDetails from './pages/TourDetails';
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/country/:id" element={<CountryPage />} />
          <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/tours" element={<ToursList />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="chatbot" element={<Chatbot />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
