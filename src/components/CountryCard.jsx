import { Link } from "react-router-dom";

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.id}`} className="shadow-md hover:shadow-lg rounded-lg overflow-hidden">
      <img src={country.flag} alt={country.name} className="w-full h-40 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-bold">{country.name}</h3>
        <p>{country.region}</p>
      </div>
    </Link>
  );
}

export default CountryCard;
