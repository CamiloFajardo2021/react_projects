// distributions.js
export default function getDistribution(data) {
    if (!Array.isArray(data) || data.length === 0) {
      return { distribution: [], values: [] };
    }
  
    const distribution = data.reduce((acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    }, {});
  
    const values = Object.keys(distribution).map(Number).sort((a, b) => a - b);
    const frequencies = values.map(value => distribution[value]);
  
    return { distribution: frequencies, values };
  }
  
 
  