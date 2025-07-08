import React, { useState } from 'react'
import QRPopup from './QRPopup';

function QrPrewiewCard({data}) {

const [isPopupOpen , setIsPopupOpen] = useState(false)

const d = new Date(data.createdAt).toLocaleDateString()


const handlePopUp=()=>{
  console.log("hello");
  setIsPopupOpen(pre => !pre)
}
const onClose = () => setIsPopupOpen(false)


  return (
    <div>
      <div className="card bg-base-100 w-35 md:w-40 h-60 shadow-sm cursor-pointer" onClick={handlePopUp}>
    <img
      src={data.qrUrl}
      alt="Shoes" 
      className='m-3 rounded-2xl'
      />
  <div className=" flex flex-col justify-center items-center text-center">
    <h2 className="card-title font-bold text-lg line-clamp-1">{data.slug}</h2>
    <h2 className="card-title font-bold text-sm line-clamp-1">{data.title}</h2>
    <p>📆 {d}</p>
  </div>

</div>
  {
    isPopupOpen && <QRPopup  data={data} onClose={onClose} qrUrl={data.qrUrl}/>
  }
</div>
  )
}

export default QrPrewiewCard