function UnescoSiteCard({ site }) {
  return (
    <div className="flex flex-col p-4 rounded-xl shadow-lg bg-base-100 border border-base-200 w-full max-w-sm">
      {site.image && (
        <img
          src={site.image}
          alt={site.name}
          className="w-full h-48 object-cover rounded-md border border-base-200 mb-3"
          loading="lazy"
        />
      )}
      <div>
        <h4 className="text-lg font-bold mb-1 text-neutral-content">{site.name}</h4>
        <p className="text-sm text-gray-400">{site.location}</p>
      </div>
    </div>
  );
}

export default UnescoSiteCard;
