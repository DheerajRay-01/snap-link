import React, { useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { toPng } from "html-to-image";
import { MdDelete } from "react-icons/md";
import axiosInstance from "../utils/axios";
import {toast , Toaster} from "react-hot-toast";
import { useDispatch } from "react-redux";
import { deleteQr } from "../utils/redux/qrSlice";

function QRPopup({ data, onClose, qrUrl, isFromHome=false }) {
  const elementRef = useRef(null);
  const dispatch = useDispatch()
  const { title, shortUrl, createdAt } = data;
  const [loading, setLoading] = useState(false);

  console.log(qrUrl);

  const date = createdAt
    ? new Date(createdAt).toLocaleDateString("en-GB")
    : null;

  const htmlToImageConvert = () => {
    toPng(elementRef.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${title || "snaplink"}-qr.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

const handleDelete = async () => {
  if (loading) return; // Prevent double clicks
  setLoading(true);

  try {
    const deleteRes = await axiosInstance.get(`/links/delete-qr/${data.slug}`);
    console.log("QR Deleted:", deleteRes.data);
    dispatch(deleteQr(data.slug))
    toast.success("🗑️ QR Code deleted successfully");
  } catch (error) {
    console.error("Delete QR failed:", error);

    if (error.response?.data?.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Failed to delete QR code. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex items-center justify-center px-4">
      <div className="bg-white p-4 rounded-lg shadow-xl w-80 max-w-full relative flex flex-col items-center gap-2">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          <AiOutlineClose className="cursor-pointer" size={20} />
        </button>

        {/* Content to convert */}
        <div
          ref={elementRef}
          className="flex flex-col items-center gap-2 bg-white  p-3 rounded-xl"
        >
          {/* QR Code */}
          <img src={qrUrl} alt="QR Code" className="w-48 h-48 object-contain" />

          {/* Info */}
          <div className="text-center text-sm">
            {title && (
              <div className="font-semibold text-black text-lg">{title}</div>
            )}
            {shortUrl && (
              <div className="text-blue-600 break-words max-w-xs">
                <a href={shortUrl} target="_blank" rel="noopener noreferrer">
                  {shortUrl}
                </a>
              </div>
            )}
            {date && <div className="text-gray-500 text-xs">📅 {date}</div>}
          </div>

          {/* Branding */}
          <div className="text-xs text-gray-400 mt-2">
            Created with{" "}
            <span className="font-semibold text-indigo-500">SnapLink</span>
          </div>
        </div>

        {/* Download Button */}
        <div className="flex items-center  w-full justify-around ">
          <button
            onClick={htmlToImageConvert}
            className="mt-3 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm rounded-md shadow transition"
          >
            Download QR Image
          </button>
          {!isFromHome &&
            (loading ? (
              <span className="loading loading-spinner text-error loading-lg absolute right-2 bottom-5 cursor-pointer "></span>
            ) : (
              <MdDelete
                onClick={handleDelete}
                className="absolute right-2 bottom-5 cursor-pointer text-red-500 hover:bg-red-500 rounded-2xl p-1 hover:text-white"
                color=""
                size={35}
              />
            ))}
        </div>
      </div>
           <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
  );
}

export default QRPopup;
