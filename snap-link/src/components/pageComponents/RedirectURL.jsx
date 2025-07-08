import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axiosInstance from '../../utils/axios'
// import ErrorBox from '../ErrorBox'
import { useNavigate } from 'react-router'
import ErrorComponent from './ErrorComponent'

// import ErrorComponent from './ErrorComponent'

function RedirectURL() {
  const navigate = useNavigate()

const {id} = useParams()
// console.log(id);

const [error ,setError] = useState('')
const [loading, setLoading] = useState(true);

// const [shortURL ,setShortUrl] = useState('')

const fetchOriginalURL = async(id)=>{
setLoading(true);
setError("");
try {
  const OriginalURLRes = await axiosInstance.get(`/links/redirect/${id}`);
  const urlData = OriginalURLRes?.data?.data || null;

  if (urlData?.protected && urlData?.slug) {
    navigate(`/protected/${urlData?.slug}`);
    return;
  }

  if (urlData?.originalURL) {
    window.location.href = urlData.originalURL;
  } else {
    setError('Original URL not found.');
  }
} catch (error) {
  const message = error?.response?.data?.message || "Something went wrong";
  setError(message);
} finally {
  setLoading(false);
}

    
}

useEffect(()=>{
    if(!id) return
    console.log(id);
    
    fetchOriginalURL(id)

},[])


  return (
    
   <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content text-center">
    <div className="max-w-md w-full space-y-6">
      
      {/* Loader */}
      {loading && (
        <div className="flex flex-col items-center justify-center space-y-3 mt-10">
          <span className="loading loading-spinner loading-6xl text-primary"></span>
          <p className="text-gray-500 text-lg">Redirecting...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <ErrorComponent msg={error} slug={id} />
      )}
      
    </div>
  </div>
</div>

  )
  
}

export default RedirectURL