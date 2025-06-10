import { Link } from "react-router-dom";
import worldMap from "../data/worldmap.jpg";


export default function LandingPage() {
  return (
    <div className="bg-neutral-900 text-neutral-content">
      {/* Hero Section */}
      <section
        className="relative h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6">
            Explore the World with Us
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl text-gray-300">
            Unique small-group adventures in over 100 countries. Travel
            sustainably. Live authentically.
          </p>
          <Link
            to="/tours"
            className="btn btn-primary text-lg px-8 py-3"
          >
            Browse Tours
          </Link>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 px-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Top Adventures</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Peru & Machu Picchu",
              img: "https://images.unsplash.com/photo-1513193232743-99c890a0e769?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            },
            {
              title: "Thailand Explorer",
              img: "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=800&q=80",
            },
            {
              title: "South African Safari",
              img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Kenya%2C_Safari_%2845203937785%29.jpg/1024px-Kenya%2C_Safari_%2845203937785%29.jpg",
            },
          ].map((tour, idx) => (
            <div
              key={idx}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition"
            >
              <figure>
                <img
                  src={tour.img}
                  alt={tour.title}
                  className="w-full h-56 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{tour.title}</h3>
                <p className="text-gray-400">
                  Experience culture, nature, and adventure with expert guides.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Travel With Us */}
      <section className="bg-neutral-800 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">Why Choose Us</h2>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div>
              <h4 className="font-semibold text-xl mb-2">Small Group Travel</h4>
              <p className="text-gray-400">
                Stay closer to the culture, with group sizes under 15.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-2">Local Experiences</h4>
              <p className="text-gray-400">
                Authentic journeys designed by local experts and guides.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-xl mb-2">Sustainable Tourism</h4>
              <p className="text-gray-400">
                Travel responsibly with a company committed to the planet.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
  className="relative py-12 text-center text-primary-content"
  style={{
    backgroundImage: `url(${worldMap})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-black bg-opacity-60" />

  {/* Content */}
  <div className="relative z-10">
    <h2 className="text-4xl font-bold mb-6">Ready to Start Your Adventure?</h2>
    <Link to="/tours" className="btn btn-secondary text-lg px-8 py-3">
      Discover Tours
    </Link>
  </div>
</section>


    </div>
  );
}
