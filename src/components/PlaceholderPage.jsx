import { Link } from 'react-router-dom';

const PlaceholderPage = ({ title, description }) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-8 md:p-12 text-center">
        <div className="mb-6">
          <div className="w-20 h-20 bg-[#007ACC] rounded-full mx-auto mb-4 flex items-center justify-center">
            <span className="text-3xl text-white font-bold">V</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h1>
          <p className="text-lg text-slate-600 mb-8">
            {description}
          </p>
          <div className="inline-block px-4 py-2 bg-amber-100 border border-amber-200 rounded-lg text-amber-800 text-sm font-medium">
            🚧 Under Construction
          </div>
        </div>
        <Link
          to="/"
          className="inline-block mt-8 px-6 py-3 bg-[#007ACC] text-white rounded-xl font-bold hover:opacity-90 transition-all"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PlaceholderPage;
