import React from "react";
import { Link, useParams } from "react-router";
import { IoKeyOutline } from "react-icons/io5";
import { useState } from "react";
import axiosInstance from "../../utils/axios";
import ErrorBox from "../ErrorBox";

function ProtectedUrl() {
  const { id } = useParams();
  const [error , setError] = useState(null)
  const [password , setPassword] = useState('')
  const [loading , setLoading] = useState(false)
  console.log(id  );
  

  const handelUnlock = async () => {
    setLoading(true)
    setError('')
    console.log(password);
    
    if(!password || password.length < 6){
        setError("Minimum length of password is 6 characters.")
        setLoading(false)
        return
    }
    
    try {
        const Unlock = await axiosInstance.post('/links/protected',{slug:id,password})
        // console.log(Unlock?.data?.data);
        const url = Unlock?.data?.data?.originalUrl

        if(Unlock.data.statusCode === 200 && url){
            window.location.href = url
        }
        // console.log(password);
        
    } catch (error) {
       const message = error?.response?.data?.message || "Something went wrong";
      setError(message);
      console.error(message);
      setLoading(false)
        
    }finally{
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold">Enter Password to Unlock</h1>
            <p className="py-6 text-lg text-gray-600">
              This link is protected for security reasons. Please enter the
              correct password to access the original content.
            </p>

            {error && <ErrorBox error={error}/>}

            <label className="input validator">
              <IoKeyOutline size={20} />
              <input
                type="password"
                required
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
                // minlength="6"
              />
            </label>
          
            <button onClick={handelUnlock} className={`btn m-3 ${loading ? "btn-error btn-disable" : " btn-primary"}`}>{loading ? "Verifying" : "Unlock"}</button>      
            <p className="text-sm text-gray-500 mt-4 text-center">
              This link was created using{" "}
            <Link
              className="text-blue-500 hover:text-blue-700"
              to="/intro"
            >
                SnapLink
            </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProtectedUrl;
