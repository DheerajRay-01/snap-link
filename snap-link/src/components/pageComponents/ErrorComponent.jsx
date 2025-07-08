import React from 'react';
import { useNavigate } from 'react-router';

function ErrorComponent({ msg = 'An error occurred', slug }) {
  const navigate = useNavigate();

  const retry = () => {
    if (slug) {
      // console.log(slug);
      
      navigate(`/${slug}`);
    } else {
      navigate(-1); // Go back if slug is missing
    }
  };

  return (
    
 <div className="p-10 text-center">
  <h1 className="text-5xl font-extrabold text-red-500 mb-3">Oops!</h1>
  <p className="text-lg text-gray-600 mb-6">{msg}</p>

  <div className="flex justify-center gap-4">
    {/* Home Button */}
    <button
      onClick={() => navigate('/')}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors duration-200"
    >
      Go to SnapLink
    </button>

    {/* Retry Button */}
    {slug && (
      <button
        onClick={retry}
        className="px-6 py-2 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-800 transition-colors duration-200"
      >
        Retry
      </button>
    )}
  </div>
</div>

  );
}

export default ErrorComponent;
