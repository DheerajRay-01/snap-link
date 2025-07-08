import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';

function CityBarChart({ data }) {
  const xAxis = data.map((item) => item.label); // City names
  const seriesData = data.map((item) => item.value); // Click counts

  console.log("Cities:", xAxis);
  console.log("Clicks:", seriesData);

  const chartSettings = {
    height: 400,
    layout: 'horizontal', // Horizontal bar chart
  };

  return (
      <BarChart
      dataset={data}
      yAxis={[{ scaleType: 'band', dataKey: 'label',label: 'Cities'  }]}
      series={[{ dataKey: 'value',  label:'Clicks'}]}
      {...chartSettings}
    />
  );
}

export default CityBarChart;
