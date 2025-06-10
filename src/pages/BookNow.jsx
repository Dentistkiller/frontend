import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import tourDetailsData from "../data/tour_details.json";

export default function BookNow() {
  const { id } = useParams();
  const tour = tourDetailsData.find((t) => t.id === id);

  const [form, setForm] = useState({
    name: "",
    email: "",
    travelers: 1,
    notes: "",
    optionalActivities: [],
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleActivityToggle = (activity) => {
    setForm((prev) => {
      const alreadySelected = prev.optionalActivities.includes(activity);
      return {
        ...prev,
        optionalActivities: alreadySelected
          ? prev.optionalActivities.filter((a) => a !== activity)
          : [...prev.optionalActivities, activity],
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking submitted:", form);
    setSubmitted(true);
  };

  if (!tour) {
    return (
      <div className="bg-neutral-900 text-neutral-content text-center py-20">
        <h1 className="text-3xl font-bold mb-4">Tour not found</h1>
      </div>
    );
  }

  const tourImage =
    tour.images?.find((img) => img.type === "BANNER_DESKTOP")?.image_href ||
    `https://source.unsplash.com/800x400/?${encodeURIComponent(
      tour.geography?.primary_country?.name || "travel"
    )}`;

  const groupSizeNotes = tour.details.find(
    (d) => d.detail_type?.label === "Group Size Notes"
  )?.body;

  const maxGroupSize = groupSizeNotes
    ? parseInt(groupSizeNotes.match(/\d+/)?.[0] || "12")
    : 12;

  const startCity = tour.geography?.start_city?.name;
  const finishCity = tour.geography?.finish_city?.name;

  const transport = tour.details.find(
    (d) => d.detail_type?.label === "Transport"
  )?.body;

  const accommodation = tour.details.find(
    (d) => d.detail_type?.label === "Accommodation"
  )?.body;

  const mealsIncluded = tour.details.find(
    (d) => d.detail_type?.label === "Meals Included"
  )?.body;

  const optionalActivitiesRaw = tour.details.find(
    (d) => d.detail_type?.label === "Optional Activities"
  )?.body;

  const optionalActivities = optionalActivitiesRaw
    ? optionalActivitiesRaw
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0 && !line.startsWith("-"))
    : [];

  if (submitted) {
    return (
      <div className="bg-neutral-900 text-neutral-content text-center py-20">
        <h1 className="text-4xl font-bold mb-4">Thank you for your booking!</h1>
        <p className="text-lg text-gray-400 mb-6">
          We will contact you soon regarding your trip to {tour.name}.
        </p>
        <Link to="/" className="text-primary hover:underline">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 text-neutral-content max-w-4xl mx-auto px-6 py-12 space-y-8">
      <Link to={`/tours/${tour.id}`} className="text-primary hover:underline text-sm block">
        ← Back to Tour Details
      </Link>

      {/* Tour Summary */}
      <div className="rounded-lg overflow-hidden shadow-lg">
        <img src={tourImage} alt={tour.name} className="h-64 w-full object-cover" />
        <div className="p-4 space-y-2">
          <h1 className="text-4xl font-bold">{tour.name}</h1>
          <div className="flex flex-wrap gap-2">
            {tour.categories.map((cat) => (
              <span
                key={cat.id}
                className="bg-primary text-white px-2 py-1 rounded text-xs font-medium"
              >
                {cat.category_type?.label}: {cat.name}
              </span>
            ))}
          </div>
          <p className="text-gray-400">{tour.description}</p>
          <p className="text-gray-400">
            <strong>Start City:</strong> {startCity} | <strong>End City:</strong> {finishCity}
          </p>
          <p className="text-gray-400">
            <strong>Transport:</strong> {transport}
          </p>
          <p className="text-gray-400">
            <strong>Accommodation:</strong> {accommodation}
          </p>
          <p className="text-gray-400">
            <strong>Meals Included:</strong> {mealsIncluded}
          </p>
        </div>
      </div>

      {/* Booking Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-base-300 rounded p-2 bg-neutral-800 text-neutral-content"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-base-300 rounded p-2 bg-neutral-800 text-neutral-content"
          />
        </div>

        <div>
          <label className="block mb-1 text-sm">Number of Travelers</label>
          <select
            name="travelers"
            value={form.travelers}
            onChange={handleChange}
            className="w-full border border-base-300 rounded p-2 bg-neutral-800 text-neutral-content"
          >
            {Array.from({ length: maxGroupSize }, (_, i) => i + 1).map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>

        {optionalActivities.length > 0 && (
          <div>
            <label className="block mb-1 text-sm">Optional Activities</label>
            <div className="space-y-1 text-sm text-gray-300">
              {optionalActivities.map((activity, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.optionalActivities.includes(activity)}
                    onChange={() => handleActivityToggle(activity)}
                    className="accent-primary"
                  />
                  <span>{activity}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            rows="4"
            className="w-full border border-base-300 rounded p-2 bg-neutral-800 text-neutral-content"
            placeholder="Any special requests?"
          />
        </div>

        <button
          type="submit"
          className="bg-primary text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:bg-primary-focus transition w-full"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
