import React, { useEffect, useState } from "react";
import { getClickAnalytics } from "../../../../server/utils/dummyClicks";
import { FaLink } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import StateCard from "../StateCard";
import PieOSChart from "../charts/PieOSChart";
import BrowserDonutChart from "../charts/BrowserDonutChart";
import ClickLineChhart from "../charts/ClickLineChhart";
import CityBarChart from "../charts/CityBarChart";
import CountryBarChart from "../charts/CountryBarChart";
import { Toaster,toast } from 'react-hot-toast';
import { useParams } from "react-router";
import axiosInstance from "../../utils/axios";


function Analytics() {
  // const data = getClickAnalytics();
    const [data , setData] = useState([])
    const [error , setError] = useState(null)
    const [loading , setLoading] = useState(false)
    const params = useParams()
    const id = params.id 

    console.log("ID",id);


useEffect(() => {
  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await axiosInstance.get(`/links/analytics/${id}`);
      console.log(res.data.data.analyticsData);

      const analytics = res?.data?.data?.analyticsData;

      setData({
        cityData: analytics.cityData || [],
        countryData: analytics.countryData || [],
        totalClicks: analytics.totalClicks || 0,
        totalUniqueUsers: analytics.totalUniqueUsers || 0,
        osData: analytics.osData || [],
        browsers: analytics.browsers || [],
        dateData: analytics.dateData || []
      });
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setError(err?.response?.data?.message || "Failed to load analytics data.");
      toast.error("Failed to load analytics data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchAnalyticsData();
}, [id]);

    

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!")
  };


   if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-700">Loading analytics...</p>
      </div>
    );
  }

   if (error || !data || Object.keys(data).length === 0) {
    return (
      <div className="flex flex-col justify-center items-center h-screen text-red-600">
        <p className="text-lg font-semibold">🚨 {error || "Failed to load analytics data"}</p>
       Something Went wrong
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0CD] text-gray-800">
 
      <div className="w-full flex flex-col">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row flex-wrap justify-between px-6 py-6 gap-6 bg-[#578FCA] text-white rounded-lg mx-4 my-4 shadow-lg">
          {/* Left Side */}
          <div className="flex flex-col gap-4">
            {/* Short Link */}
            <p className="flex items-center gap-2 text-lg">
              <strong>SnapLink:</strong>
              <span className="underline">localhost:5173/analytics</span>
              <LuCopy
                size={20}
                className="cursor-pointer hover:text-[#FADA7A] transition-colors"
                onClick={() => copyToClipboard("localhost:5173/analytics")}
              />
            </p>

            {/* Original Link */}
            <div
              className="tooltip flex items-center gap-3 group"
              data-tip="Double Click to Copy"
            >
              <strong>Original:</strong>
              <input
                type="text"
                // readOnly
                value="https://github.com/devias-io/material-kit-react"
                className="rounded-lg border border-[#FADA7A] p-2 w-full max-w-md text-gray-800"
                onDoubleClick={() =>
                  copyToClipboard("https://github.com/devias-io/material-kit-react")
                }
              />
              <LuCopy
                size={22}
                className="cursor-pointer hover:text-[#FADA7A] transition-colors"
                onClick={() =>
                  copyToClipboard("https://github.com/devias-io/material-kit-react")  
                }
              />
            </div>

            {/* Date */}
            <p className="text-gray-200">Generated on: 12/12/12</p>
          </div>

          {/* Stats Card */}
          <StateCard
            totalCity={data.cityData.length}
            totalClick={data.totalClicks}
            totalCountry={data.countryData.length}
            totalUniqueUser={data.totalUniqueUsers}
          />
        </header>

        {/* Main Content */}
        <main className="flex w-full flex-col gap-6 px-4 pb-8">
          {/* Line Chart */}
          <div className="bg-[#F5F0CD] rounded-xl shadow hover:shadow-lg transition p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#3674B5]">📈 Clicks Over Time</h2>
            <ClickLineChhart data={data.dateData} />
          </div>

          {/* State-wise Clicks */}
          <div className="bg-[#F5F0CD] rounded-xl shadow hover:shadow-lg transition p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#3674B5]">🗺️ State-wise Clicks</h2>
            <p className="text-gray-700">Coming soon: Choropleth map or bar chart</p>
          </div>

          {/* Pie Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F5F0CD] rounded-xl shadow hover:shadow-lg transition p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#3674B5]">🖥️ OS Distribution</h2>
              <PieOSChart data={data.osData} />
            </div>
            <div className="bg-[#F5F0CD] rounded-xl shadow hover:shadow-lg transition p-6">
              <h2 className="text-xl font-semibold mb-4 text-[#3674B5]">🌐 Browser Distribution</h2>
              <BrowserDonutChart data={data.browsers} />
            </div>
          </div>

          {/* City & Country Clicks */}
          <div className="bg-[#F5F0CD] rounded-xl shadow hover:shadow-lg transition p-6">
            <h2 className="text-xl font-semibold mb-4 text-[#3674B5]">🏙️ City & Country Clicks</h2>
            <div className="flex flex-col md:flex-row gap-6">
              <CityBarChart data={data.cityData} />
              <CountryBarChart data={data.countryData} />
            </div>
          </div>
        </main>
      </div>
           <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </div>
    // <></>
  );
}

export default Analytics;
