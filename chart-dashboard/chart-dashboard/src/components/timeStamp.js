import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Chart} from 'chart.js'
import { useState, useRef, useEffect } from 'react';
ChartJS.register(
  Title, LineElement, Legend, CategoryScale, LinearScale, PointElement, Tooltip
)

function TimeStamp(props) {
  
  useEffect(() => {
  }, [])
  return (
    <div>
      <span>{props.timeStamp}</span>
    </div>
  );
}

export default TimeStamp;
