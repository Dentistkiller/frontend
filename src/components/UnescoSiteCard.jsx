function UnescoSiteCard({ site }) {
    return (
      <div className="border rounded-lg overflow-hidden shadow-sm">
        {site.image && (
          <img src={site.image} alt={site.name} className="w-full h-40 object-cover" />
        )}
        <div className="p-3">
          <h4 className="text-lg font-semibold">{site.name}</h4>
          <p className="text-sm">{site.location}</p>
        </div>
      </div>
    );
  }
  
  export default UnescoSiteCard;
  