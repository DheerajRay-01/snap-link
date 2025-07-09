import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axiosInstance from "../utils/axios";
import {toast ,Toaster} from 'react-hot-toast'
import { useDispatch } from "react-redux";
import { updateLink } from "../utils/redux/myLinksSlice";
import copy from "copy-to-clipboard";
import { FaLink } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
// import { hashPassword } from "../../../server/utils/link_utils";

function ManageLink({ linkData, onClose }) {
  console.log(linkData);

  const [slug, setSlug] = useState(linkData.slug);
  const [title, setTitle] = useState(linkData.title);
  const [isProtected, setIsProtected] = useState(linkData.isProtected);
  const [password, setPassword] = useState(null);
  const [HasPassword, setHasPassword] = useState(!!linkData.password);  
  const [clickLimit, setClickLimit] = useState(linkData.clickLimit);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch()

 const handleUpdate = async () => {
  setLoading(true)
  try {
    // Prepare payload
    const data = { slug, title, password, isProtected, clickLimit };

    if (title.trim() === "") {
      toast.error("Title cannot be empty");
      return;
    }
      // if (isProtected && (!password || password.trim() === "")) {
      //   toast.error("Please provide a password for protected links");
      //   return;
      // }

    // Call API
    const updateRes = await axiosInstance.post(
      `/links/update-details/${linkData.slug}`,
      data
    );

    console.log("Updated Data", updateRes.data.data.updatedURL);
    toast.success("Link details updated successfully!");
    dispatch(updateLink(updateRes.data.data.updatedURL))
    onClose();
  } catch (error) {
    console.error(error);

    // 🔥 Show detailed error message
    const message =
      error.response?.data?.message ||
      (error.code === "ERR_NETWORK" ? "Network error. Please check your connection." : "Update failed");
    toast.error(message);
  }finally{
    setLoading(false)
  }
};


const handleCopy =()=> {
    copy(linkData.originalUrl);
    toast.success("Original URL copied to clipboard!");
}


  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      ></div>

      {/* Popup */}
      <div className="fixed top-1/2 left-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-xl shadow-lg p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center text-black">
          <h2 className="text-lg font-semibold m-auto">Manage Link</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 cursor-pointer"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <p className="text-black flex w-full items-center gap-3 justify-center" ><strong>SnapLink:</strong> snap-link/{linkData.slug}  <LuCopy size={25} className="inline cursor-pointer" color="black" onClick={handleCopy}/></p>
          
        {/* Inputs */}
        <div className="space-y-3  flex flex-col justify-center items-center">

           {/* <p
  className="text-black line-clamp-1 border rounded-md px-3 py-2 cursor-pointer transition-colors duration-200 hover:bg-blue-100 active:bg-blue-200"
  title={linkData.originalUrl} // Full URL on hover
  onClick={() => {
    copy(linkData.originalUrl);
    toast.success("Original URL copied to clipboard!");
  }}
>
  {linkData.originalUrl}
</p> */}


<div className="tooltip w-full flex items-center gap-4" data-tip="Double Click to Copy ">
  <FaLink size={30} color="black"/>
  <input type="text" value={linkData.originalUrl} className="rounded-lg border-2 w-full p-2 text-gray-700 border-blue-600 hover:bg-blue-100" onDoubleClick={handleCopy}/>
  <LuCopy size={30} color="black" onClick={handleCopy}/>
</div>
          <label className="input">
            <span className="label">Title</span>
            <input
              type="text"
              placeholder="Add Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label className="input">
            <span className="label">Slug</span>
            <input
              type="text"
              placeholder="domain name"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />
          </label>

          <label className="input">
            <span className="label">Click Limit</span>
            <input
              type="number"
              placeholder="Enter CLick Limit"
              value={clickLimit}
              onChange={(e) => setClickLimit(e.target.value)}
            />
          </label>

          <div className="flex items-center gap-4 ">
            <span className="text-sm text-black font-medium">
              Password Protected
            </span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={isProtected}
                className="sr-only peer"
                onChange={(e) => setIsProtected(e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 transition-colors duration-300"></div>
              <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform duration-300 peer-checked:translate-x-5"></div>
            </label>
          </div>
          {/* <label className="input"> */}

          {isProtected && (
            <label className="input ">
              <span className="label">Password</span>

              <input
                type="password"
                // value={password}
                placeholder={HasPassword ? "Change Password" : "Set Password"}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
          )}

        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-2 pt-4 m-auto ">
          <button onClick={onClose} className="btn btn-sm btn-warning">
            Cancel
          </button>
          {
            loading ? (
              <button className="btn btn-sm btn-primary">
                <span className="loading loading-dots loading-lg"></span>
              </button>
          ) 
            : (
              <button className="btn btn-sm btn-primary" onClick={handleUpdate}>
                 Save Details
              </button>
            )
          }
        
        </div>
      </div>
            <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  );
}

export default ManageLink;
