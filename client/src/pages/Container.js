import React, { useState, useEffect } from "react";
import Plot from 'react-plotly.js';

export default function Container() {
  const [pointCount, setPointCount] = useState(3142);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [z, setZ] = useState([]);
  const [c, setC] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPointCount(prevPointCount => {
        const newPointCount = prevPointCount + 1;
        return newPointCount <= 6000 ? newPointCount : 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    generateValues();
  }, [pointCount]);

  const generateValues = () => {
    const newX = [];
    const newY = [];
    const newZ = [];
    const newC = [];

    for (let i = 0; i < pointCount; i++) {
      const r = i * (pointCount - i);
      newX.push(r * Math.cos(i / 30));
      newY.push(r * Math.sin(i / 30));
      newZ.push(i);
      newC.push(i);
    }

    setX(newX);
    setY(newY);
    setZ(newZ);
    setC(newC);
  };

  const handleSliderChange = (event) => {
    setPointCount(Number(event.target.value));
  };

  return (
    <div>
      <input
        type="range"
        min="1"
        max="6000"
        value={pointCount}
        onChange={handleSliderChange}
      />
      <Plot
        data={[
          {
            type: 'scatter3d',
            mode: 'lines',
            x: x,
            y: y,
            z: z,
            opacity: 0.7,
            line: {
              width: 10,
              color: c,
              colorscale: 'Viridis',
            },
          }
        ]}
        layout={{ width: 600, height: 600, title: "Dynamic Plot" }}
      />
    </div>
  );
}