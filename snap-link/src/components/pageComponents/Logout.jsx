import React, { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import axiosInstance from "../../utils/axios";
import { useDispatch } from "react-redux";
import { deleteUser } from "../../utils/redux/userSlice";
import { deleteMyQrs } from "../../utils/redux/qrSlice";
import { deleteMyLinks } from "../../utils/redux/myLinksSlice";

function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
     const res =  await axiosInstance.get("/user/logout");
        
     console.log(res.data);
     
      dispatch(deleteUser());
      dispatch(deleteMyQrs());
      dispatch(deleteMyLinks());

      toast.success("Logout successful");

         navigate("/login");
 
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      console.error("Logout error:", message);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <h1 className="text-5xl font-bold">SnapLink</h1>
            <p className="py-6">
              You’re about to log out of SnapLink. Do you wish to proceed?
            </p>
            {loading ? (
              <button className="btn btn-error mx-2" onClick={handleLogout}>
                <span className="loading loading-dots loading-xl text-white"></span>
              </button>
            ) : (
              <button className="btn btn-error mx-2" onClick={handleLogout}>
                Confirm Logout
              </button>
            )}

            <button
              className="btn btn-primary mx-2"
              onClick={() => navigate(-1)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default Logout;
