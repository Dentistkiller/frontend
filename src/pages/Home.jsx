import countries from "../data/mergedCountries.json";
import CountryCard from "../components/CountryCard";

function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Explore Countries & Cultures 🌎</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {countries.map((country) => (
          <CountryCard key={country.id} country={country} />
        ))}
      </div>
    </div>
  );
}

export default Home;
