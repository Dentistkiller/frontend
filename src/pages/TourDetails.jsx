import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function TourDetails() {
  const { id } = useParams();
  const [tour, setTour] = useState(null);

  useEffect(() => {
    fetch(`https://tours-server-nocp.onrender.com/api/tours/${id}`)
      .then((res) => res.json())
      .then((data) => setTour(data))
      .catch((err) => console.error('Error fetching tour details:', err));
  }, [id]);

  if (!tour) {
    return (
      <div className="bg-neutral-900 text-neutral-content text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Loading...</h1>
      </div>
    );
  }

  // Get best image or fallback to Unsplash if none available
  const tourImage =
    tour.images?.find((img) => img.type === 'BANNER_DESKTOP')?.image_href ||
    `https://source.unsplash.com/800x400/?${encodeURIComponent(tour.geography?.primary_country?.name || 'travel')}`;

  return (
    <div className="bg-neutral-900 text-neutral-content max-w-4xl mx-auto px-6 py-12">
      {/* Breadcrumb link */}
      <div className="mb-6 text-sm">
        <Link
          to="/tours"
          className="text-primary hover:underline flex items-center gap-1"
        >
          ← Back to all tours
        </Link>
      </div>

      {/* Tour image */}
      <img
        src={tourImage}
        alt={tour.name || 'Tour Image'}
        className="h-64 w-full object-cover rounded-xl mb-6"
      />

      {/* Tour name & description */}
      <h1 className="text-4xl font-bold mb-2">{tour.name}</h1>
      <p className="text-gray-400 italic mb-4">
        {tour.geography?.primary_country?.name}
      </p>
      <p className="text-lg text-gray-400 mb-8">{tour.description}</p>

      {/* Meta Section */}
<div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-gray-400">
  {tour.categories?.map((cat) => (
    <div key={cat.id}>
      <span className="font-semibold text-neutral-content block">{cat.category_type?.label}</span>
      <span>{cat.name}</span>
    </div>
  ))}

  {tour.details?.find((d) => d.detail_type?.label === "Group Size Notes") && (
    <div>
      <span className="font-semibold text-neutral-content block">Group Size</span>
      <span>
        {
          tour.details.find((d) => d.detail_type?.label === "Group Size Notes")
            ?.body
        }
      </span>
    </div>
  )}

  {tour.details?.find((d) => d.detail_type?.label === "Meals Included") && (
    <div>
      <span className="font-semibold text-neutral-content block">Meals Included</span>
      <span>
        {
          tour.details.find((d) => d.detail_type?.label === "Meals Included")
            ?.body
        }
      </span>
    </div>
  )}

  {tour.details?.find((d) => d.detail_type?.label === "Transport") && (
    <div>
      <span className="font-semibold text-neutral-content block">Transport</span>
      <span>
        {
          tour.details.find((d) => d.detail_type?.label === "Transport")
            ?.body
        }
      </span>
    </div>
  )}
</div>


      {/* What's Included */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b border-base-200 pb-2">
          What's Included
        </h2>
        {tour.details
          ?.filter((d) => d.detail_type?.label === "What's Included")
          .map((d, i) => (
            <p key={i} className="text-gray-300 mb-2">{d.body}</p>
          ))}
      </div>

      {/* Highlights */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 border-b border-base-200 pb-2">
          Highlights
        </h2>
        {tour.details
          ?.filter((d) => d.detail_type?.label === 'Highlights')
          .map((d, i) => (
            <p key={i} className="text-gray-300 mb-2">{d.body}</p>
          ))}
      </div>

      {/* Itinerary */}
      {tour.structured_itineraries?.[0]?.days && (
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 border-b border-base-200 pb-2">
            Itinerary
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            {tour.structured_itineraries[0].days.map((day, index) => (
              <li key={index}>
                <strong>Day {day.day}:</strong> {day.summary}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link
  to={`/book/${tour.id}`}
  className="inline-block bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-primary-focus transition"
>
  Book Now →
</Link>

    </div>
    
  );
}
