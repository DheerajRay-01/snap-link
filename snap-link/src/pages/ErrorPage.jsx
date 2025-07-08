import React from 'react';
import { useLocation, useNavigate } from 'react-router';

function ErrorPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { msg, url, code } = location.state || {};

  const handleRetry = () => {
    // Navigate back to the same redirect attempt (if url ID was passed)
    if (url) {
      window.location.href = url;
    } else {
      navigate(-1); // Go back to previous page
    }
  };

  return (
    <div className="p-10 text-center">
      <h1 className="text-5xl font-bold text-red-600 mb-4">Error {code || 404}</h1>
      <p className="text-lg">{msg || 'An unexpected error occurred.'}</p>

      <div className="mt-6 flex justify-center gap-4">
        <button
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          onClick={() => navigate('/')}
        >
          Go to Homepage
        </button>
        <button
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          onClick={handleRetry}
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
