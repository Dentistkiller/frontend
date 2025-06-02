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

  if (!country) {
    return <p>Country not found.</p>;
  }

  // Get UNESCO sites for this country (using .includes() for flexible matching)
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
    <div>
      <Link to="/" className="text-blue-600">← Back to Home</Link>
      <div className="mt-4 flex items-center gap-4">
        <img src={country.flag} alt={country.name} className="w-16" />
        <h1 className="text-3xl font-bold">{country.name}</h1>
      </div>
      <div className="mt-4">
        <p><strong>Capital:</strong> {country.capital}</p>
        <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
        <p><strong>Language:</strong> {country.language}</p>
        <p><strong>Currency:</strong> {country.currency}</p>
      </div>

      <h2 className="text-2xl font-bold mt-6">🌟 UNESCO World Heritage Sites</h2>
      {matchingSites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {matchingSites.map((site, idx) => (
            <UnescoSiteCard key={idx} site={site} />
          ))}
        </div>
      ) : (
        <p>No UNESCO sites found.</p>
      )}
    </div>
  );
}

export default CountryPage;
