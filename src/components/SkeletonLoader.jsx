const SkeletonLoader = ({ variant = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count });

  if (variant === 'card') {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skeletons.map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 animate-pulse">
            <div className="w-full h-48 bg-slate-200 rounded-xl mb-4"></div>
            <div className="h-6 bg-slate-200 rounded-lg mb-3 w-3/4"></div>
            <div className="h-4 bg-slate-200 rounded-lg mb-2 w-full"></div>
            <div className="h-4 bg-slate-200 rounded-lg mb-4 w-5/6"></div>
            <div className="flex gap-2">
              <div className="h-8 bg-slate-200 rounded-lg w-24"></div>
              <div className="h-8 bg-slate-200 rounded-lg w-24"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'list') {
    return (
      <div className="space-y-4">
        {skeletons.map((_, i) => (
          <div key={i} className="bg-white rounded-lg p-4 animate-pulse flex gap-4">
            <div className="w-16 h-16 bg-slate-200 rounded-lg flex-shrink-0"></div>
            <div className="flex-1">
              <div className="h-5 bg-slate-200 rounded-lg mb-2 w-1/3"></div>
              <div className="h-4 bg-slate-200 rounded-lg mb-2 w-full"></div>
              <div className="h-4 bg-slate-200 rounded-lg w-2/3"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'table') {
    return (
      <div className="bg-white rounded-lg overflow-hidden">
        <div className="animate-pulse">
          {/* Header */}
          <div className="bg-slate-100 p-4 border-b flex gap-4">
            <div className="h-5 bg-slate-200 rounded w-1/4"></div>
            <div className="h-5 bg-slate-200 rounded w-1/4"></div>
            <div className="h-5 bg-slate-200 rounded w-1/4"></div>
            <div className="h-5 bg-slate-200 rounded w-1/4"></div>
          </div>
          {/* Rows */}
          {skeletons.map((_, i) => (
            <div key={i} className="p-4 border-b flex gap-4">
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
              <div className="h-4 bg-slate-200 rounded w-1/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: text skeleton
  return (
    <div className="space-y-3 animate-pulse">
      {skeletons.map((_, i) => (
        <div key={i}>
          <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonLoader;
