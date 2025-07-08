import React from 'react'
import { LineChart } from '@mui/x-charts/LineChart';

function ClickLineChhart({data}) {
  
  
  // Extract dates and counts from data
  const xAxisData = data.map((item) => item.label); // ["7/1/2025", "7/2/2025", ...]
  const seriesData = data.map((item) => item.value); // [8, 7, 9, 3, 8, 8, 4, 3]

  return (
    <LineChart
      xAxis={[{ data: xAxisData,scaleType: 'point', label: 'Date' }]}
      series={[
        {
          data: seriesData,
          label: 'Clicks',
          color: '#4f46e5', // optional: set line color
        },
      ]}
      height={350}
      // width={500}
    />
  )
}

export default ClickLineChhart