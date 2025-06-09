import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
              <Link
                key={tour.id}
                to={`/tours/${tour.id}`}
                className="bg-white rounded-lg shadow hover:shadow-xl overflow-hidden transition"
              >
                <img
                  src={imageUrl}
                  alt={tour.name}
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://source.unsplash.com/400x300/?travel";
                  }}
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-1">{tour.name}</h2>
                  <p className="text-sm text-gray-600">
                    Product Line: {tour.product_line || "N/A"}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
