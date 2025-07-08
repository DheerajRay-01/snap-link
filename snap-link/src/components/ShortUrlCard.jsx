import React, { useState } from 'react'
import { IoIosLink } from "react-icons/io";
import { LuCopy } from "react-icons/lu";
import { FiExternalLink } from "react-icons/fi";
import copy from 'copy-to-clipboard'
import { Toaster,toast } from 'react-hot-toast';
import { FaQrcode } from "react-icons/fa";
import axiosInstance from '../utils/axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import QRPopup from './QRPopup';
import { useDispatch } from 'react-redux';


function ShortUrlCard({linkData}) {
const url = linkData.shortUrl
const slug = linkData.slug
const dispatch = useDispatch()
// const {url,slug} = l
const  [loading,setLoading] = useState(false)
const [qrOpen , setQrOpen] = useState(false)
const [qrUrl , setQrUrl] = useState("")


  const copyUrl = () =>{
    copy(url)
    toast.success("Copied")
  }

  const goToUrl =()=>{
    window.open(url, '_blank');
  }


const generateQR = async () => {
  if (loading) return; // Prevent double clicks
  setLoading(true);
  console.log("hello");

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
    setLoading(false);
  }
};


  return (  
    <div>
        <div role="alert" className=" alert alert-vertical sm:alert-horizontal my-3">

 <IoIosLink size={20}/>
  <span className='font-bold text-lg'>{url}</span>
  <div className='flex items-center'>

    
    <button className="cursor-pointer ml-3 " onClick={generateQR}>{loading ? <AiOutlineLoading3Quarters className="animate-spin text-xl" size={20}/>:<FaQrcode size={20}/> } </button>
    <button className="cursor-pointer ml-3 " onClick={goToUrl}> <FiExternalLink size={20}/></button>
    <button className="cursor-pointer ml-3 " onClick={copyUrl}><LuCopy size={20}/></button>
  </div>
</div>
     <Toaster
  position="bottom-right"
  reverseOrder={false}
/>
{qrOpen && <QRPopup data={linkData} qrUrl={qrUrl} onClose={()=>setQrOpen(false)} isFromHome={true}/>}
    </div>
  )
}

export default ShortUrlCard