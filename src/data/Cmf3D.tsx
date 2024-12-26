import { newPlot } from "plotly.js-dist-min";
import { useEffect, useRef } from "react";
import { Chart } from "../components/Chart.tsx";
import data from "./CIE_xyz_1931_2deg.csv.ts";

export function Cmf3D() {
  const ref = useRef(null);
  useEffect(() => {
    newPlot(ref.current!, [
      {
        type: "scatter3d",
        mode: "lines",
        x: data.map(([lambda, x, y, z]) => x),
        y: data.map(([lambda, x, y, z]) => y),
        z: data.map(([lambda, x, y, z]) => z),
        opacity: 1,
        line: { width: 2, color: "#000" },
      },
      {
        type: "scatter3d",
        mode: "lines",
        x: data.map(([lambda, x, y, z]) => x / (x + y + z)),
        y: data.map(([lambda, x, y, z]) => y / (x + y + z)),
        z: data.map(([lambda, x, y, z]) => 0),
        opacity: 1,
        line: { width: 2, color: "#00f" },
      },
    ]);
  }, []);
  return (
    <Chart>
      <div ref={ref} style={{ width: "100%", height: 600 }} />
    </Chart>
  );
}
