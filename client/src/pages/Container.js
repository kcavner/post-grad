import React, { useState, useEffect } from "react";
import Plot from 'react-plotly.js';

export default function Container() {
  const [pointCount, setPointCount] = useState(3142);
  const [x, setX] = useState([]);
  const [y, setY] = useState([]);
  const [z, setZ] = useState([]);
  const [c, setC] = useState([]);
  const [pointValue, setPointValue] = useState(3142);
  const [updateSpeed, setUpdateSpeed] = useState(1);
  const [paused, setPaused] = useState(false); // New state variable for pause/resume

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) { // Only update if not paused
        setPointCount(prevPointCount => {
          const newPointCount = prevPointCount + updateSpeed;
          return newPointCount <= 6000 ? newPointCount : 1;
        });
      }
    }, 1000 / updateSpeed);

    return () => {
      clearInterval(interval);
    };
  }, [updateSpeed, paused]); // Include paused state in the dependency array

  useEffect(() => {
    generateValues();
  }, [pointCount, pointValue]);

  const generateValues = () => {
    const newX = [];
    const newY = [];
    const newZ = [];
    const newC = [];

    for (let i = 0; i < pointCount; i++) {
      const r = i + (pointCount - i);
      newX.push(r * Math.sin(1*i) + Math.cos(pointValue / 1000));
      newY.push(r * Math.cos(i) + (pointValue / 1000));
      newZ.push(r * Math.sin(3*i) +Math.cos(pointValue / 1000));
      newC.push(Math.sin(i));
    }

    setX(newX);
    setY(newY);
    setZ(newZ);
    setC(newC);
  };

  const handlePointValueChange = (event) => {
    const value = Number(event.target.value);
    setPointValue(value);
    setPointCount(value);
  };

  const handleUpdateSpeedChange = (event) => {
    const value = Number(event.target.value);
    setUpdateSpeed(value);
  };

  const handlePauseResume = () => {
    setPaused(prevPaused => !prevPaused);
  };

  return (
    <div>
      <div>
        <label htmlFor="pointValue">Point Value:</label>
        <input
          type="range"
          id="pointValue"
          min="1"
          max="6000"
          value={pointValue}
          onChange={handlePointValueChange}
        />
        <span>{pointValue}</span>
      </div>
      <div>
        <label htmlFor="updateSpeed">Update Speed:</label>
        <input
          type="range"
          id="updateSpeed"
          min="5"
          max="100"
          step="5"
          value={updateSpeed}
          onChange={handleUpdateSpeedChange}
        />
        <span>{(updateSpeed / 100).toFixed(2)}s</span>
      </div>
      <div>
        <button onClick={handlePauseResume}>
          {paused ? "Resume" : "Pause"}
        </button>
      </div>
      <Plot  
        data={[
          {
            type: 'scatter3d',
            mode: 'lines',
            x: x,
            y: y,
            z: z,
            opacity: .4,
            line: {
              width: 3,
              color: c,
              colorscale: 'Viridis'
            },
          }
        ]}
        layout={{ 
          width: 600,
          height: 600,
          title: "Dynamic Plot",
          scene:{bgcolor:"black"},
          paper:{bgcolor:'black'}
        }}
       
      />
    </div>
  );
}
