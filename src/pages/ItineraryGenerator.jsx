import { useState } from "react";

export default function ItineraryGenerator() {
  const [userInput, setUserInput] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async () => {
    if (!userInput.trim()) return;

    setLoading(true);
    setError("");
    setItinerary("");

    try {
      const res = await fetch("https://cohere-serverr.onrender.com/holiday", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userInput }),
      });

      const data = await res.json();

      if (data.itinerary) {
        setItinerary(data.itinerary);
      } else {
        setError("Failed to generate itinerary.");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while generating the itinerary.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Holiday Itinerary Generator</h1>

      <div className="mb-6">
        <textarea
          className="textarea textarea-bordered w-full h-32"
          placeholder="Describe your ideal holiday... (e.g., 7-day Japan trip with food, anime, culture)"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        ></textarea>
      </div>

      <div className="flex justify-center mb-8">
        <button
          className={`btn btn-primary ${loading ? "btn-disabled" : ""}`}
          onClick={handleGenerate}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Itinerary"}
        </button>
      </div>

      {error && (
        <p className="text-center text-red-500 mb-4">{error}</p>
      )}

      {itinerary && (
        <div className="bg-base-100 shadow-xl p-6 rounded-lg whitespace-pre-wrap">
          <h2 className="text-2xl font-bold mb-4 text-center">Generated Itinerary</h2>
          <p>{itinerary}</p>
        </div>
      )}
    </div>
  );
}
