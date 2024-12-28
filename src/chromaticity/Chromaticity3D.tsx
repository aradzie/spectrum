import { newPlot } from "plotly.js-dist-min";
import { useEffect, useRef, useState } from "react";
import { xyzToCieRgb } from "../color/color-cie.ts";
import { type Rgb, type Xyz } from "../color/types.ts";
import { Chart } from "../components/Chart.tsx";
import data from "../data/CIE_xyz_1931_2deg.csv.ts";

type Config = {
  coord: "xyz" | "rgb";
};

export function Chromaticity3D() {
  const [config, setConfig] = useState<Config>({ coord: "xyz" });
  const ref = useRef(null);
  useEffect(() => {
    let values = [...data, data[0]];
    if (config.coord === "rgb") {
      const tmpXyz: Xyz = { x: 0, y: 0, z: 0 };
      const tmpRgb: Rgb = { r: 0, g: 0, b: 0 };
      values = values.map(([lambda, x, y, z]) => {
        tmpXyz.x = x;
        tmpXyz.y = y;
        tmpXyz.z = z;
        xyzToCieRgb(tmpXyz, tmpRgb);
        const { r, g, b } = tmpRgb;
        return [lambda, r, g, b];
      });
    }
    newPlot(
      ref.current!,
      [
        {
          type: "scatter3d",
          mode: "lines",
          x: values.map(([lambda, x, y, z]) => x),
          y: values.map(([lambda, x, y, z]) => y),
          z: values.map(([lambda, x, y, z]) => z),
          opacity: 0.8,
          line: { width: 3, color: "#000" },
        },
        {
          type: "scatter3d",
          mode: "lines",
          x: [1, 0, 0, 1],
          y: [0, 1, 0, 0],
          z: [0, 0, 1, 0],
          opacity: 0.5,
          line: { width: 2, color: "#000" },
        },
        {
          type: "scatter3d",
          mode: "lines",
          x: values.map(([lambda, x, y, z]) => x / (x + y + z)),
          y: values.map(([lambda, x, y, z]) => y / (x + y + z)),
          z: values.map(([lambda, x, y, z]) => z / (x + y + z)),
          opacity: 0.8,
          line: { width: 3, color: "#33f" },
        },
        {
          type: "scatter3d",
          mode: "lines",
          x: [1, 0, 0, 1],
          y: [0, 1, 0, 0],
          z: [0, 0, 0, 0],
          opacity: 0.5,
          line: { width: 2, color: "#000" },
        },
        {
          type: "scatter3d",
          mode: "lines",
          x: values.map(([lambda, x, y, z]) => x / (x + y + z)),
          y: values.map(([lambda, x, y, z]) => y / (x + y + z)),
          z: values.map(([lambda, x, y, z]) => 0),
          opacity: 0.8,
          line: { width: 3, color: "#33f" },
        },
      ],
      {},
      {
        displaylogo: false,
        showLink: false,
        showSendToCloud: false,
        showEditInChartStudio: false,
      },
    );
  }, [config]);
  return (
    <Chart>
      <div ref={ref} style={{ width: "100%", aspectRatio: 1 }} />
      <Controls config={config} onChangeConfig={setConfig} />
    </Chart>
  );
}

function Controls({
  config,
  onChangeConfig,
}: {
  config: Config;
  onChangeConfig: (config: Config) => void;
}) {
  return (
    <div>
      <label>
        <input
          name="coord"
          type="radio"
          checked={config.coord === "xyz"}
          onClick={() => {
            onChangeConfig({ ...config, coord: "xyz" });
          }}
        />
        xyz
      </label>
      <label>
        <input
          name="coord"
          type="radio"
          checked={config.coord === "rgb"}
          onClick={() => {
            onChangeConfig({ ...config, coord: "rgb" });
          }}
        />
        rgb
      </label>
    </div>
  );
}
