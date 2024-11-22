import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";

const Heatmap = () => {
  const [data, setData] = useState([]); // State to hold heatmap data
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for errors

  useEffect(() => {
    // Fetch data from the FastAPI backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/heatmap-data"); // FastAPI endpoint
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        console.log("response", response)
        const result = await response.json(); // Parse JSON from response
        console.log("result", result.z)
        setData(result.z); // Assuming the API returns a JSON object with a "z" field
      } catch (err) {
        setError(err.message); // Capture errors
      } finally {
        setLoading(false); // End loading state
      }
    };

    fetchData();
  }, []); // Empty dependency array to fetch only once on component mount

  if (loading) return <p>Loading heatmap...</p>;
  if (error) return <p>Error loading heatmap: {error}</p>;

  return (
    <div>
      <h1>React Heatmap</h1>
      <Plot
        data={[
          {
            z: data, // Use fetched data
            x: ["1 hr", "2 hr", "3 hr", "4 hr", "5 hr", "6 hr"], // Example x-axis data
            y: [1, 2, 3, 4], // Example y-axis data
            type: "heatmap",
          },
        ]}
        layout={{
          title: "Heatmap Example",
          width: 600,
          height: 400,
        }}
      />
    </div>
  );
};

export default Heatmap;