const SectionSkeleton = () => (
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
    <div className="shimmer h-5 w-20 mb-4 rounded-full" />
    <div className="shimmer h-10 w-64 mb-12 rounded-lg" />
    <div className="grid md:grid-cols-2 gap-6">
      {[1, 2].map((i) => (
        <div key={i} className="shimmer h-64 rounded-3xl" />
      ))}
    </div>
  </div>
);

export default SectionSkeleton;
