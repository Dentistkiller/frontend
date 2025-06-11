import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import CountryPage from "./pages/CountryPage";
import LandingPage from "./pages/LandingPage";
import Footer from "./components/Footer";
import ToursList from './pages/ToursList';
import TourDetails from './pages/TourDetails';
import Chatbot from "./pages/Chatbot";
import ChatWidget from "./components/ChatWidget";
import BookNow from "./pages/BookNow";
import ItineraryGenerator from "./pages/ItineraryGenerator";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/countries" element={<Home />} />
          <Route path="/country/:id" element={<CountryPage />} />
          <Route path="/" element={<LandingPage />} />
        <Route path="/tours" element={<ToursList />} />
        <Route path="/tours/:id" element={<TourDetails />} />
        <Route path="chatbot" element={<Chatbot />} />
        <Route path="/book/:id" element={<BookNow />} />
        <Route path="/itinerary-generator" element={<ItineraryGenerator />} />
        </Routes>
      </div>
      <ChatWidget />
      <Footer />
    </BrowserRouter>
  );
}

export default App;
