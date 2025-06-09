import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore the World with Us
          </h1>
          <p className="text-lg md:text-xl mb-6 max-w-2xl">
            Unique small-group adventures in over 100 countries. Travel
            sustainably. Live authentically.
          </p>
          <Link
            to="/tours"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-lg"
          >
            Browse Tours
          </Link>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">Top Adventures</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Peru & Machu Picchu",
              img: "https://images.unsplash.com/photo-1617037088281-1d7694cf9ef1?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "Thailand Explorer",
              img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "South African Safari",
              img: "https://images.unsplash.com/photo-1558888401-1be9b85c66b3?auto=format&fit=crop&w=800&q=80",
            },
          ].map((tour, idx) => (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={tour.img}
                alt={tour.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                <p className="text-gray-600">
                  Experience culture, nature, and adventure with expert guides.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="bg-blue-50 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-lg">Small Group Travel</h4>
              <p className="text-gray-600">
                Stay closer to the culture, with group sizes under 15.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Local Experiences</h4>
              <p className="text-gray-600">
                Authentic journeys designed by local experts and guides.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-lg">Sustainable Tourism</h4>
              <p className="text-gray-600">
                Travel responsibly with a company committed to the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-600 py-12 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Adventure?</h2>
        <Link
          to="/contact"
          className="inline-block bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg shadow-md transition"
        >
          Get in Touch
        </Link>
      </section>
    </div>
  );
}
