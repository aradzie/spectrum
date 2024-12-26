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
import { xyzToCieRgb } from "../color/color-cie.ts";
import { Chart } from "../components/Chart.tsx";
import { Description } from "../components/Description.tsx";
import data from "./CIE_xyz_1964_10deg.csv.ts";
import meta from "./CIE_xyz_1964_10deg.csv_metadata.json";

export function CIE_xyz_1964_10deg_RGB() {
  const rgb = { r: 0, g: 0, b: 0 };
  return (
    <Chart>
      <Description.Title meta={meta} />
      <ResponsiveContainer aspect={2}>
        <LineChart
          width={500}
          height={300}
          data={data
            .map(([lambda, x, y, z]) => [lambda, x || 0, y || 0, z || 0])
            .map(([lambda, x, y, z]) => {
              xyzToCieRgb({ x, y, z }, rgb);
              return { name: `${lambda}nm`, ...rgb };
            })}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="r" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="g" stroke="#82ca9d" dot={false} />
          <Line type="monotone" dataKey="b" stroke="#caa88d" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <Description meta={meta} />
    </Chart>
  );
}
