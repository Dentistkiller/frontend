import { useParams, Link } from "react-router-dom";
import restCountries from "../data/rest_countries.json";
import unescoData from "../data/unesco_sites.json";
import UnescoSiteCard from "../components/UnescoSiteCard";

function CountryPage() {
  const { id } = useParams();

  const countries = restCountries.map((c) => ({
    id: c.name.common.toLowerCase().replace(/\s/g, "_"),
    name: c.name.common,
    flag: c.flags?.png || "",
    capital: c.capital?.[0] || "",
    region: c.region || "",
    population: c.population || 0,
    language: Object.values(c.languages || {})[0] || "",
    currency: Object.keys(c.currencies || {})[0] || "",
  }));

  const country = countries.find((c) => c.id === id);
  if (!country) return <p className="text-center text-xl mt-8 text-neutral-content">Country not found.</p>;

  const unescoSitesRaw = unescoData.query.row;
  const matchingSites = unescoSitesRaw
    .filter((site) =>
      site.states?.toLowerCase().includes(country.name.toLowerCase())
    )
    .map((site) => ({
      name: site.site,
      location: site.short_description,
      image: site.image_url,
      region: site.region,
      category: site.category,
      date_inscribed: site.date_inscribed,
      url: site.http_url,
    }));

  return (
    <div className="bg-neutral-900 text-neutral-content min-h-screen">
      {/* Hero Section */}
      <div
        className="relative h-[60vh] bg-cover bg-center rounded-b-3xl shadow-md"
        style={{ backgroundImage: `url(${country.flag})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center">
          <h1 className="text-white text-6xl font-extrabold drop-shadow-lg">{country.name}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-6">
          <Link to="/" className="text-primary hover:underline text-sm">← Back to Home</Link>
        </div>

        {/* About Country */}
        <div className="grid md:grid-cols-2 gap-12">
          <div className="text-lg space-y-4">
            <h2 className="text-4xl font-bold mb-4">🌍 About {country.name}</h2>
            <ul className="space-y-2">
              <li><strong>Capital:</strong> {country.capital}</li>
              <li><strong>Region:</strong> {country.region}</li>
              <li><strong>Population:</strong> {country.population.toLocaleString()}</li>
              <li><strong>Language:</strong> {country.language}</li>
              <li><strong>Currency:</strong> {country.currency}</li>
            </ul>
          </div>

          {/* Country Flag */}
          <div className="rounded-2xl overflow-hidden border-4 border-neutral-700 shadow-xl">
            <img src={country.flag} alt={country.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* UNESCO Sites */}
        <div className="mt-16">
          <h2 className="text-4xl font-bold mb-6">🏛 UNESCO World Heritage Sites</h2>
          {matchingSites.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {matchingSites.map((site, idx) => (
                <UnescoSiteCard key={idx} site={site} />
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No UNESCO sites found for this country.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
