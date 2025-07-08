import React, { useEffect, useState } from "react";
import QrPrewiewCard from "../QrPrewiewCard";
import axiosInstance from "../../utils/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchMoreQr } from "../../utils/redux/qrSlice";

function MyQr() {
  const allQr = useSelector((state) => state.qr.allQr);
  const { limit, currentPage } = useSelector((state) => state.qr);
  const [qrs, setQrs] = useState(allQr);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch()
//   console.log(allQr);

  useEffect(() => {
    setQrs(allQr);
  }, [allQr]);


 const loadMoreQr = async () => {
  if (loading) return; // Prevent multiple simultaneous requests

  setLoading(true);
  try {
    const qrRes = await axiosInstance.get(`/links/all-qr?p=${currentPage}&l=${limit}`);
    const qr = qrRes.data.data.allQr || [];

    console.log("Fetched QRs:", qr);

    // Check if there are more pages
    setHasMore(qr.length === limit);

    // Update Redux state
    dispatch(fetchMoreQr(qr));
  } catch (err) {
    console.error("Error loading more QRs:", err);
    // Show user-friendly error (if using toast or alert)
    if (err.response?.data?.message) {
      toast.error(err.response.data.message);
    } else {
      toast.error("Failed to load more QR codes. Please try again.");
    }
  } finally {
    setLoading(false);
  }
};


  return (
  <div className="hero bg-base-200 min-h-screen">
  <div className="hero-content flex flex-col items-center w-full ">
    <div className=" w-fit shadow-xl p-4 rounded-lg min-w-[400px]">
      {/* QR Grid */}
      <div className="h-[75vh] overflow-y-auto grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
        {qrs && qrs.length > 0 ? (
          qrs.map((q) => <QrPrewiewCard key={q._id} data={q} />)
        ) : (
          <p className="text-center text-gray-500 col-span-full py-10">
            No QR Codes Found
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center mt-6">
        {hasMore && !loading && (
          <button
            className="btn btn-info btn-wide"
            onClick={loadMoreQr}
          >
            Load More QRs
          </button>
        )}
        {loading && (
          <button className="btn btn-outline btn-info btn-wide" disabled>
            <span className="loading loading-spinner loading-sm"></span>
            Loading...
          </button>
        )}
        {!hasMore && qrs.length > 0 && (
          <p className="text-gray-400 mt-2">🎉 You’ve reached the end</p>
        )}
      </div>
    </div>
  </div>
</div>

  );
}

export default MyQr;
