// ChartsOverviewDemo.jsx
import {useEffect,useState} from 'react';
import { LineChart,lineElementClasses } from '@mui/x-charts/LineChart';
import getDistribution from './distributions';

export default function ChartsOverviewDemo({ data,measure ,isNode}) {
    
    const [display, setDisplay] = useState(isNode ? 'none' : 'block');
    useEffect(() => {
      if (isNode) {
        setDisplay('none');
      } else {
        setDisplay('block');
      }
    }, [isNode]);

  if (!data || !data.nodes) return null;

  console.log('measue',measure);
  let dataAux;
  //list of measures : grado,fortaleza,entropia de fortaleza,D
  switch(measure){
    case 'Grado':
        dataAux = data.nodes.map((node) => node.attributes.entropy);
        break;
    case 'Fortaleza':
        dataAux = data.nodes.map((node) => node.attributes.entropy);
        break;
    case 'Entropia (H)':
        dataAux = data.nodes.map((node) => node.attributes.clustering);
        break;
    default :
        dataAux = data.nodes.map((node) => node.attributes.clustering);
  };

  const result = getDistribution(dataAux);

  return (
    <div style={{ display: display ,height:'90%'}} >
    <LineChart sx={{
        [`& .${lineElementClasses.marker}`]: {
            fill: (d, i) => (i === 0 ? 'red' : 'blue'), // Red for the first series, blue for the second
            stroke: 'none', // No border
          },
        [`& .${lineElementClasses.root}`]: {
          strokeDasharray: '10 5',
          strokeWidth: 1,
        },
      }}
        xAxis={[{ data: result.values ,label:measure}]}
        yAxis={[
            { id: 'linearAxis', scaleType: 'linear' },
            { id: 'logAxis', scaleType: 'log' },
        ]}
        series={[
            { yAxisId: 'linearAxis', data: result.distribution, label: 'linear',color:'red' },
            { yAxisId: 'logAxis', data: result.distribution, label: 'log' ,color:'blue'},
        ]}
        leftAxis="linearAxis"
        rightAxis="logAxis"
  height={400}
/>
</div>
  );
};

  /*  
  return (
    <BarChart
      series={[
        { data: data_aux },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={290}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
  );
  */
