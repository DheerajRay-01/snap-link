import React from "react";
import { getClickAnalytics } from "../../../../server/utils/dummyClicks";
import StateCard from "../StateCard";
import PieOSChart from "../charts/PieOSChart";
import BrowserDonutChart from "../charts/BrowserDonutChart";
import ClickLineChhart from "../charts/ClickLineChhart";
import CityBarChart from "../charts/CityBarChart";
import CountryBarChart from "../charts/CountryBarChart";
import { Toaster,toast } from 'react-hot-toast';


function Analytics() {
  const data = getClickAnalytics();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!")
  };

  return (
    <div className="min-h-screen bg-[#F5F0CD] text-gray-800">
      {/* Page Title */}
      {/* <div className="px-6 py-8 border-b bg-[#3674B5] text-white shadow sticky top-0 z-10">
        <h1 className="text-3xl font-bold tracking-tight">📊 Analytics Dashboard</h1>
      </div> */}

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
            totalUniqueUser={data.uniqueUsers}
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
  );
}

export default Analytics;
