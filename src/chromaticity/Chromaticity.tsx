import { useEffect, useRef, useState } from "react";
import { clamp } from "../color/clamp.ts";
import { formatRgb, rgbInGamut, xyzToRgb } from "../color/color-rgb.ts";
import { type Rgb, type Xyz } from "../color/types.ts";
import { Canvas, type CanvasRef } from "../components/Canvas.tsx";
import data from "../data/CIE_xyz_1931_2deg.csv.ts";
import * as styles from "./Chromaticity.module.css";

export function Chromaticity() {
  const canvasRef = useRef<CanvasRef>(null);
  const [luminosity, setLuminosity] = useState(50);
  const [clipLow, setClipLow] = useState(true);
  const [clipHigh, setClipHigh] = useState(false);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const context = canvas.getContext("2d")!;
    const size = canvas.getSize();
    paint(context, size, { luminosity: luminosity / 100, clipLow, clipHigh });
  }, [luminosity, clipLow, clipHigh]);
  return (
    <div className={styles.root}>
      <Canvas ref={canvasRef} />
      <div>
        <label>
          <input
            type={"range"}
            min={1}
            max={100}
            step={1}
            value={luminosity}
            onChange={(ev) => {
              setLuminosity(ev.target.valueAsNumber);
            }}
          />
          luminosity (Y)
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={clipLow}
            onChange={(ev) => {
              setClipLow(ev.target.checked);
            }}
          />
          clip low
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={clipHigh}
            onChange={(ev) => {
              setClipHigh(ev.target.checked);
            }}
          />
          clip high
        </label>
      </div>
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
  {
    luminosity: Y,
    clipLow,
    clipHigh,
  }: {
    luminosity: number;
    clipLow: boolean;
    clipHigh: boolean;
  },
) {
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, width, height);
  paintSrgbSpace(ctx, width, height, Y, clipLow, clipHigh);
  paintSpectralLocus(ctx, width, height);
}

function paintSrgbSpace(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  Y: number,
  clipLow: boolean,
  clipHigh: boolean,
): void {
  const imageData = ctx.getImageData(0, 0, width, height);
  const xyz: Xyz = { x: 0, y: 0, z: 0 };
  const rgb: Rgb = { r: 0, g: 0, b: 0 };
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const x = i / width;
      const y = 1 - j / height;
      xyz.x = (Y / y) * x;
      xyz.y = Y;
      xyz.z = (Y / y) * (1 - x - y);
      xyzToRgb(xyz, rgb);
      const { r, g, b } = rgb;
      if (
        (!clipLow || (r >= 0 && g >= 0 && b >= 0)) &&
        (!clipHigh || (r <= 1 && g <= 1 && b <= 1))
      ) {
        const o = (j * width + i) * 4;
        imageData.data[o] = clamp(r) * 255;
        imageData.data[o + 1] = clamp(g) * 255;
        imageData.data[o + 2] = clamp(b) * 255;
        if (!rgbInGamut(rgb)) {
          imageData.data[o + 3] = 127;
        }
      }
    }
  }
  ctx.putImageData(imageData, 0, 0);
}

function paintSpectralLocus(ctx: CanvasRenderingContext2D, width: number, height: number): void {
  const xyz: Xyz = { x: 0, y: 0, z: 0 };
  const rgb: Rgb = { r: 0, g: 0, b: 0 };
  for (let index = 1; index < data.length; index++) {
    const [lambda0, X0, Y0, Z0] = data[index - 1];
    const [lambda1, X1, Y1, Z1] = data[index];

    const x0 = X0 / (X0 + Y0 + Z0);
    const y0 = Y0 / (X0 + Y0 + Z0);
    const i0 = Math.round(x0 * width);
    const j0 = Math.round((1 - y0) * height);

    const x1 = X1 / (X1 + Y1 + Z1);
    const y1 = Y1 / (X1 + Y1 + Z1);
    const i1 = Math.round(x1 * width);
    const j1 = Math.round((1 - y1) * height);

    xyz.x = X1;
    xyz.y = Y1;
    xyz.z = Z1;
    xyzToRgb(xyz, rgb);

    ctx.strokeStyle = formatRgb(rgb);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(i0, j0);
    ctx.lineTo(i1, j1);
    ctx.stroke();
  }
}
