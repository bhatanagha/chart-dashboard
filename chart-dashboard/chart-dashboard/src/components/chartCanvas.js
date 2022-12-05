import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Chart} from 'chart.js'
import { useState, useRef, useEffect } from 'react';
import TimeStamp from './timeStamp'
ChartJS.register(
  Title, LineElement, Legend, CategoryScale, LinearScale, PointElement, Tooltip
)

function ChartCanvas(props) {

  const [chartInstance, setInstance] = useState({})
  const [timestamp, setTimeStamp] = useState(null)

  
  useEffect(() => {
    const c = Chart.getChart(props.id);
    setInstance(c)
    console.log(c, 'chart instance')
    
    if (chartInstance.canvas) {
      const onMouseMove = (chart, e) => {
        const { data, scales: {x} } = chart
        const xCoOrd = e.offsetX
        const timeStampLabel = data.labels[x.getValueForPixel(xCoOrd)]
        setTimeStamp(timeStampLabel)
      }
        chartInstance.canvas.addEventListener('mousemove', (e) => {
          onMouseMove(chartInstance, e)
        })
    }
  }, [chartInstance])

  
      const options = {
        responsive: true,
        maintainAspectRatio: false,
        hover: {
          mode: 'index',
          intersect: false,
        },
        elements:{
          point:{
              borderWidth: 0,
              radius: 10,
              backgroundColor: 'rgba(1,0,0,0)'
          }
      },
        plugins: {
          lines: {
            color: 'black',
          }
        },
        layout: {
          padding: 20
      }
      }
      const plugin = {
        id: 'lines',
        defaults: {
            width: 1,
            color: '#FF4949',
            dash: [1, 1],
        },
        afterInit: (chart, args, opts) => {
          chart.crossHairLines = {
            y: 0,
          }
        },
        afterEvent: (chart, args) => {
          const {inChartArea} = args
          const {x,y} = args.event
    
          chart.crossHairLines = {x, y, draw: inChartArea}
          chart.draw()
        },
        afterDraw: (chart, args, opts) => {
          const {ctx} = chart
          const {top, bottom} = chart.chartArea
          const {x, draw} = chart.crossHairLines
          if (!draw) return
    
          ctx.save()
          
          ctx.beginPath()
          ctx.lineWidth = opts.width
          ctx.strokeStyle = opts.color
    
          ctx.moveTo(x, bottom)
          ctx.lineTo(x, top)
          ctx.stroke()
          
          ctx.restore()
        }
      }
  return (
    <div className="App" style={{width: "500px", height: "500px"}}>
     <Line id={props.id} plugins={[plugin]} options={options} data={props.data}></Line>
     <TimeStamp timeStamp={timestamp}></TimeStamp>
    </div>
  );
}

export default ChartCanvas;
