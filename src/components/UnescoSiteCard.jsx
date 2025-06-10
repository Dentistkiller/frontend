function UnescoSiteCard({ site }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl shadow-lg bg-base-100 border border-base-200">
      {/* Small square image */}
      {site.image && (
        <img
          src={site.image}
          alt={site.name}
          className="w-40 h-39 object-cover rounded-md border border-base-200 flex-shrink-0"
          loading="lazy"
        />
      )}

      {/* Text section */}
      <div>
        <h4 className="text-lg font-bold mb-1 text-neutral-content">{site.name}</h4>
        <p className="text-sm text-gray-400">{site.location}</p>
      </div>
    </div>
  );
}

export default UnescoSiteCard;
