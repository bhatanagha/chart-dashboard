import './App.css';
import ChartCanvas from './components/chartCanvas';
import { useState } from 'react';

function App() {
  let objData = require('./data.json');

  var soc = objData.soc.map(i => i.soc)
  const [data, setData] = useState({
    labels: objData.soc.map(i => i.time),
    datasets: [{
      backgroundColor: "rgba(0,0,255,1.0)",
      data: soc,
      label: 'SOC-Time',
      pointRadius: 0,
      borderWidth: 2,
      borderColor: "rgba(0,0,0,0.5)",
    }]
  })

  const volt = objData.battery_voltage.map(i => i.battery_voltage)
  const [data2, setData2] = useState({
    labels: objData.battery_voltage.map(i => i.time),
    datasets: [{
      backgroundColor: "rgba(0,0,255,1.0)",
      data: volt,
      label: 'Voltage-Time',
      pointRadius: 0,
      borderWidth: 2,
      borderColor: "rgba(0,0,0,0.5)"
    }]
  })

  return (
    <div className="App" style={{ height: "500px", display: "flex"}}>
      <ChartCanvas id="soc-time" data={data}></ChartCanvas> 
      <ChartCanvas id="volt-time"data={data2}></ChartCanvas>
    </div>
  );
}

export default App;
