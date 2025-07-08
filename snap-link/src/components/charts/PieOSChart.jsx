import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';

function PieOSChart({data}) {
  return (
    <PieChart series={[{data},]} width={200} height={200}/>
    // <p>hello</p>
  ) 
  
}

export default PieOSChart