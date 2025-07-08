import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';


function BrowserDonutChart({data}) {

const settings = {
  margin: { top: 10, bottom: 10, left: 10, right: 10 },
  width: 250, // Slightly larger for readability
  height: 250,
  legend: { hidden: true }, // hide legend if not needed
};

return (
  <PieChart
    series={[
      {
        innerRadius: 50, // Donut style
        outerRadius: 100,
        data,
        // arcLabel: (item) => `${item.label}: ${item.value}`, // Show name + value
      },
    ]}
    {...settings}
  />
);

}

export default BrowserDonutChart