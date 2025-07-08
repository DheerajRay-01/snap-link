import React, { useState } from 'react';
import { LuCopy, LuShare2 } from 'react-icons/lu';
import copy from 'copy-to-clipboard';
import {toast ,Toaster} from 'react-hot-toast'
import axiosInstance from '../utils/axios';
import { MdLockOutline } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { deleteLink } from '../utils/redux/myLinksSlice';
import ManageLink from './ManageLink';
import { useNavigate } from 'react-router';

function MyLinksCard({data}) {



  const navigate = useNavigate()

  const {title,clicks,shortUrl,slug,isProtected} = data
  const [active ,setActive] = useState(data?.active)
  const date = new Date(data.createdAt).toLocaleDateString('en-GB')
  const [loading, setLoading] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false)
  const dispatch = useDispatch()

    const copyUrl = () =>{
      copy(shortUrl)
      toast.success('copied')
    }

    // console.log(data);
    


const toggleStatus = async () => {
  try {
    setLoading(true);
    const toggleRes = await axiosInstance.patch("/links/update-status", { slug });
    setActive(prev => !prev);
    toast.success(`Link ${!active ? 'activated' : 'deactivated'}`);
  } catch (error) {
    console.error(error);
    toast.error("Failed to toggle link status");
  } finally {
    setLoading(false);
  }
};


const handleDelete = async()=>{
  try {
    
    const deleteRes = await axiosInstance.delete(`/links/delete/${slug}`)
    if(deleteRes.data.success){
      console.log(deleteRes);
      toast.success(`Link Deleted ${slug}`)
      dispatch(deleteLink(slug))
    }
  } catch (error) {
    
  }
}

const handleShare = () => {
  if (navigator.share) {
      navigator.share({
      title: title|| 'SnapLink',
      text: 'I created this short and shareable link using SnapLink. Access it here:',
      url: shortUrl,
    })
    .then(() => toast.success('Shared successfully'))
    .catch((error) => toast.error('Error sharing:', error));
  } else {
    alert('Sharing is not supported in this browser.');
  }
};



  return (
    
      <>
      {/* Title & URL */}
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-base">{isProtected &&  <MdLockOutline className='inline mr-2' size={17} color='red'/>}{title}</div>
          <div className="text-xs font-medium text-gray-500 break-all">{shortUrl}</div>
        </div>
        <div className="flex gap-1">
    
          <button className="btn btn-circle btn-ghost" title="Copy" onClick={copyUrl}>
            <LuCopy size={18} />
          </button>
          <button className="btn btn-circle btn-ghost" title="Share" onClick={handleShare}>
            <LuShare2 size={18} />
          </button>
        </div>
      </div>

      {/* Compact Info (Mobile) */}
      <div className="text-xs text-gray-600 flex justify-between items-center sm:hidden">
        <span>Clicks: {clicks}</span>
            <span>📅 {date}</span>
           <span className="text-green-600 font-semibold">Active</span>
   <input
  type="checkbox"
  onChange={toggleStatus}
  checked={active}
  disabled={loading}
  className="toggle 
    border-gray-300 bg-gray-200 
    checked:border-green-500 checked:bg-green-500 
    transition duration-200"
/>
<button className='btn btn-ghost btn-circle' onClick={handleDelete}>
  <MdDeleteForever size={25} color='white'/>
</button>


      </div>

      {/* Detailed Info (Laptop/Desktop) */}
      <div className="hidden sm:flex justify-between items-center text-xs text-gray-600">
        <span>📅 {date}</span>
        <span>🖱️ Clicks: {clicks}</span>
        <div className="flex items-center gap-1">
          <span className="text-green-600 font-semibold">Active</span>
   <input
  type="checkbox"
  onChange={toggleStatus}
  checked={active}
  disabled={loading}
  className="toggle 
    border-gray-300 bg-gray-200 
    checked:border-green-500 checked:bg-green-500 
    transition duration-200"
/>
<button className='btn btn-ghost btn-circle' onClick={handleDelete}>
  <MdDeleteForever size={25} color='white'/>
</button>

        </div>
      </div>

      {/* CTA Button (Responsive Text) */}
      <button className="w-full bg-amber-200 text-black text-sm py-2 rounded-md hover:bg-amber-300 transition" onClick={()=>setIsManageOpen(pre => !pre)}>
        <span className="block sm:hidden">Manage</span>
        <span className="hidden sm:block">Manage Link & Analytics</span>  
      </button>
      <button className='btn-error btn' onClick={()=>navigate("/analytics")}>Analytics</button>
      {isManageOpen&& <ManageLink linkData={data} onClose={()=>setIsManageOpen(pre => !pre)}/>}

{/* <button className="btn btn-primary" onClick={()=>document.getElementById('my_modal_5').showModal()}>Manage</button>
<dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
</dialog> */}


      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    </>
  );
}

export default MyLinksCard;
