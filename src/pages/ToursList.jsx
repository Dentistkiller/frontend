import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//import ChatWidget from "./components/ChatWidget";

// 👇 Import local JSON files directly
import toursData from "../data/tours.json";
import imageMap from "../data/tour_images.json";

export default function ToursList() {
  const [tours, setTours] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (optional)
    setTimeout(() => {
      setTours(toursData);
      setImages(imageMap);
      setLoading(false);
    }, 200);
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Available Tours</h1>

      {loading ? (
        <p className="text-center">Loading tours...</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tours.map((tour) => {
            const imageUrl =
              images[tour.id] ||
              `https://source.unsplash.com/400x300/?${encodeURIComponent(
                tour.name || "travel"
              )}`;

              return (
                <Link key={tour.id} to={`/tours/${tour.id}`}>
                  <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition">
                    <figure>
                      <img src={imageUrl} alt={tour.name} className="h-48 w-full object-cover" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{tour.name}</h2>
                      <p>Product Line: {tour.product_line || "N/A"}</p>
                      <div className="card-actions justify-end">
                        <button className="btn btn-primary">View Details</button>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }
