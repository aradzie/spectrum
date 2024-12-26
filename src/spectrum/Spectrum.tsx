import { useEffect, useRef } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatRgb } from "../color/color-rgb.ts";
import { type Rgb } from "../color/types.ts";
import { Canvas, type CanvasRef } from "../components/Canvas.tsx";
import { dataRgb } from "./data.ts";
import * as styles from "./Spectrum.module.css";

export function Spectrum() {
  const canvasRef = useRef<CanvasRef>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const size = canvas.getSize();
    paint(context, size);
  }, []);
  return (
    <div className={styles.root}>
      <Canvas ref={canvasRef} style={{ blockSize: "100px" }} />
      <ResponsiveContainer>
        <LineChart
          data={dataRgb.map(([lambda, r, g, b]) => ({ name: `${lambda}nm`, r, g, b }))}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="r" stroke="#f00" dot={false} />
          <Line type="monotone" dataKey="g" stroke="#0c0" dot={false} />
          <Line type="monotone" dataKey="b" stroke="#00f" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

function paint(
  ctx: CanvasRenderingContext2D,
  {
    width,
    height,
  }: {
    width: number;
    height: number;
  },
) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  const rgb: Rgb = { r: 0, g: 0, b: 0 };
  for (let i = 0; i < width; i++) {
    const index = Math.floor((i / width) * dataRgb.length);
    const [lambda, r, g, b] = dataRgb[index];
    rgb.r = r;
    rgb.g = g;
    rgb.b = b;
    ctx.fillStyle = formatRgb(rgb);
    ctx.fillRect(i, 0, 1, height);
  }
}
