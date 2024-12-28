import { useEffect, useMemo, useRef, useState } from "react";
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
import { clamp } from "../color/clamp.ts";
import { formatRgb, xyzToRgb } from "../color/color-rgb.ts";
import { type Rgb, type Xyz } from "../color/types.ts";
import { Canvas, type CanvasRef } from "../components/Canvas.tsx";
import data from "../data/CIE_xyz_1931_2deg.csv.ts";
import * as styles from "./SpectrumDiagram.module.css";

export function SpectrumDiagram() {
  const [scale, setScale] = useState(33);
  const [normalize, setNormalize] = useState(false);
  const data = useMemo(() => mapData(scale / 100, normalize), [scale, normalize]);
  const [{ width, height }, setSize] = useState({ width: 0, height: 0 });
  const canvasRef = useRef<CanvasRef>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas != null && width > 0 && height > 0) {
      const context = canvas.getContext("2d")!;
      const size = canvas.getSize();
      paint(context, size, data);
    }
  }, [width, height, data]);
  return (
    <div className={styles.root}>
      <ResponsiveContainer
        aspect={2}
        onResize={(newWidth, newHeight) => {
          if (newWidth !== width || newHeight !== height) {
            setSize({ width: newWidth, height: newHeight });
          }
        }}
      >
        <LineChart
          data={data.map(([lambda, r, g, b]) => ({
            name: `${lambda}nm`,
            r,
            g,
            b,
            cr: clamp(r),
            cg: clamp(g),
            cb: clamp(b),
          }))}
          margin={{
            top: 150,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[-2, +2]} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cr" stroke="#f00" dot={false} strokeDasharray="3 3" />
          <Line type="monotone" dataKey="cg" stroke="#0c0" dot={false} strokeDasharray="3 3" />
          <Line type="monotone" dataKey="cb" stroke="#00f" dot={false} strokeDasharray="3 3" />
          <Line type="monotone" dataKey="r" stroke="#f00" dot={false} />
          <Line type="monotone" dataKey="g" stroke="#0c0" dot={false} />
          <Line type="monotone" dataKey="b" stroke="#00f" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      {width > 0 && height > 0 && (
        <Canvas
          ref={canvasRef}
          style={{
            inlineSize: width - 60,
            blockSize: 150,
            position: "absolute",
            left: 60,
            top: 0,
          }}
        />
      )}
      <div>
        <label>
          <input
            type={"range"}
            min={1}
            max={100}
            step={1}
            value={scale}
            onChange={(ev) => {
              setScale(ev.target.valueAsNumber);
            }}
          />
          scale
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={normalize}
            onChange={(ev) => {
              setNormalize(ev.target.checked);
            }}
          />
          normalize
        </label>
      </div>
    </div>
  );
}

function mapData(scale: number, normalize: boolean) {
  scale = clamp(scale);
  const xyz: Xyz = { x: 0, y: 0, z: 0 };
  const rgb: Rgb = { r: 0, g: 0, b: 0 };
  const rgbData = data.map(([lambda, x, y, z]) => {
    xyz.x = x * scale;
    xyz.y = y * scale;
    xyz.z = z * scale;
    xyzToRgb(xyz, rgb);
    const { r, g, b } = rgb;
    return [lambda, r, g, b];
  });
  if (normalize) {
    let min = Infinity;
    let max = -Infinity;
    for (const [lambda, r, g, b] of rgbData) {
      min = Math.min(min, r, g, b);
      max = Math.max(max, r, g, b);
    }
    return rgbData.map(([lambda, r, g, b]) => {
      r = (r - min) / (max - min);
      g = (g - min) / (max - min);
      b = (b - min) / (max - min);
      return [lambda, r, g, b];
    });
  } else {
    return rgbData;
  }
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
  data: number[][],
) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  const rgb: Rgb = { r: 0, g: 0, b: 0 };
  for (let i = 0; i < width; i++) {
    const index = Math.floor((i / width) * data.length);
    const [lambda, r, g, b] = data[index];
    rgb.r = clamp(r);
    rgb.g = clamp(g);
    rgb.b = clamp(b);
    ctx.fillStyle = formatRgb(rgb);
    ctx.fillRect(i, 0, 1, height);
  }
}
