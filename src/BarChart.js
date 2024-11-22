import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';

const BarChart = () => {
  const [chartData, setChartData] = useState({ x: [], y: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from the FastAPI backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:8000/chart-data');
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        // Log individual elements
        console.log("Categories (x-axis):", data.categories);
        console.log("Values (y-axis):", data.values);
  
        // Update chart data
        
        setChartData({
          x: data.categories,
          y: data.values,
        });
        setError(null); // Clear any previous errors
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p>Error loading chart: {error}</p>;

  return (
    <Plot
      data={[
        {
          x: chartData.x,
          y: chartData.y,
          type: 'bar',
        },
      ]}
      layout={{
        title: 'Dynamic Bar Chart',
        xaxis: { title: 'Categories' },
        yaxis: { title: 'Values' },
        plot_bgcolor: '#f9f9f9',
        paper_bgcolor: '#ffffff',
      }}
      style={{ width: '100%', height: '400px' }}
    />
  );
};

export default BarChart;

