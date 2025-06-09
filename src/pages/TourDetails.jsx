import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    fetch(`/api/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((err) => console.error('Error fetching tour details:', err));
  }, [id]);

  if (!tour) {
    return (
      <div className="text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  // Get best image or fallback to Unsplash if none available
  const tourImage =
    tour.images?.find((img) => img.type === 'BANNER_DESKTOP')?.image_href ||
    `https://source.unsplash.com/800x400/?${encodeURIComponent(tour.geography?.primary_country?.name || 'travel')}`;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <img
        src={tourImage}
        alt={tour.name || 'Tour Image'}
        className="h-64 w-full object-cover rounded-xl mb-6"
      />

      <h1 className="text-4xl font-bold mb-2">{tour.name}</h1>
      <p className="text-gray-600 italic mb-4">{tour.geography?.primary_country?.name}</p>
      <p className="text-lg text-gray-700 mb-6">{tour.description}</p>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">What's Included</h2>
        {tour.details
          ?.filter((d) => d.detail_type?.label === "What's Included")
          .map((d, i) => (
            <p key={i} className="text-gray-800">{d.body}</p>
          ))}
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Highlights</h2>
        {tour.details
          ?.filter((d) => d.detail_type?.label === 'Highlights')
          .map((d, i) => (
            <p key={i} className="text-gray-800">{d.body}</p>
          ))}
      </div>

      {tour.structured_itineraries?.[0]?.days && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Itinerary</h2>
          <ul className="list-disc list-inside text-gray-700">
            {tour.structured_itineraries[0].days.map((day, index) => (
              <li key={index}>
                <strong>Day {day.day}:</strong> {day.summary}
              </li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/tours" className="text-blue-600 hover:underline">
        ← Back to all tours
      </Link>
    </div>
  );
}
