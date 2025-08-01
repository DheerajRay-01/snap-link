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
import { TbQrcode } from "react-icons/tb";
import QRPopup from './QRPopup';

function MyLinksCard({data}) {



  const navigate = useNavigate()

  const {title,clicks,shortUrl,slug,isProtected} = data
  const [active ,setActive] = useState(data?.active)
  const date = new Date(data.createdAt).toLocaleDateString('en-GB')
  const [loading, setLoading] = useState(false);
  const [qrLoading, setQrLoading] = useState(false);
  const [isManageOpen, setIsManageOpen] = useState(false)
  const [qrUrl, setQrUrl] = useState(data.qrUrl)
  const [qrOpen, setQrOpen] = useState(false)
  const dispatch = useDispatch()

    const copyUrl = () =>{
      copy(shortUrl)
      toast.success('copied')
    }


    const handleAnalytics = () => {
      navigate(`/analytics/${data._id}`)
      // console.log(data._id);
    }

 const generateQR = async () => {
  if (qrLoading) return; // Prevent double clicks
  setQrLoading(true);

  try {
    const res = await axiosInstance.post("/links/generate-qr", { slug });
    const qr = res?.data?.data?.qrUrl;
    console.log(qr);
    

    if (qr) {
      
      toast.success("✅ QR Code Generated");
      setQrUrl(qr);
      setQrOpen(true);
    } else {
      toast.error("Failed to generate QR code. Try again.");
    }
  } catch (error) {
    console.error("QR generation failed:", error);

    if (error.response?.data?.message) {
      toast.error(error.response.data.message); // API error message
    } else if (error.request) {
      toast.error("Network error. Check your internet connection.");
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  } finally {
    setQrLoading(false);
  }
};

    // console.log(data);

const handleQr = async ()=>{
  if(qrUrl){
    setQrOpen((pre)=> !pre)
  }else{
   await generateQR()
   setQrOpen(true)
  }
}
    


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
    
      <div className=''>
      {/* Title & URL */}
      <div className="flex items-start justify-between ">
        <div className=''>
          <div className="font-semibold text-base">{isProtected &&  <MdLockOutline className='inline mr-2' size={17} color='red'/>}{title}</div>
          <div className="text-xs font-medium text-gray-500 break-all ">snap-link/{slug}</div>
        </div>
        <div className="flex flex-row">
    
          <button className="btn btn-circle btn-ghost" title="Copy" onClick={copyUrl}>
            <LuCopy size={18} />
          </button>
          <button className="btn btn-circle btn-ghost" title="Share" onClick={handleShare}>
            <LuShare2 size={18} />
          </button>
        </div>
      </div>

      {/* Compact Info (Mobile) */}
      <div className="text-xs text-gray-600 flex justify-between items-center sm:hidden py-2">
        <div className='flex font-bold flex-col'>
        <span>Clicks:{clicks}</span>
            <span>{date}  </span>
            </div>

            <div className='flex gap-2 justify-center items-center'>
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
</div>
{
  qrLoading ? (
       <button className='btn btn-ghost btn-circle' onClick={handleQr}>
  <span className="loading loading-ring loading-sm"></span>
</button>
  ) : (
    <button className='btn btn-ghost btn-circle' onClick={handleQr}>
  <TbQrcode size={25} color='white'/>
</button>
  )
}

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
{
  qrLoading ? (
       <button className='btn btn-ghost btn-circle' onClick={handleQr}>
  <span className="loading loading-ring loading-sm"></span>
</button>
  ) : (
    <button className='btn btn-ghost btn-circle' onClick={handleQr}>
  <TbQrcode size={25} color='white'/>
</button>
  )
}
<button className='btn btn-ghost btn-circle' onClick={handleDelete}>
  <MdDeleteForever size={25} color='white'/>
</button>



        </div>
      </div>

      {/* CTA Button (Responsive Text) */}
  <div className="flex gap-3">
  <button
    className="flex-1 bg-amber-200 text-black text-sm py-2 rounded-md hover:bg-amber-300 cursor-pointer"
    onClick={() => setIsManageOpen((prev) => !prev)}
  >
    Manage
  </button>
  <button
    className="flex-1 bg-blue-400 text-black text-sm py-2 rounded-md hover:bg-blue-500 cursor-pointer"
    onClick={handleAnalytics}
  >
    Analytics
  </button>
</div>

{isManageOpen && <ManageLink linkData={data} onClose={() => setIsManageOpen((prev) => !prev)}/>}

        


{qrOpen && <QRPopup data={data} qrUrl={qrUrl} onClose={()=> setQrOpen(false)} />}

      <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
    </div >
  );
}

export default MyLinksCard;
