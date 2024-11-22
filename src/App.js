import React from 'react';
import BarChart from './BarChart'; // Ensure this path matches where BarChart.js is located
import Heatmap from "./Heatmap";

const App = () => {
  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>My Bar Chart</h1>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BarChart />
        <Heatmap/>
      </div>
    </div>
  );
};

export default App;
