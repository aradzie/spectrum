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
import { Chart } from "../components/Chart.tsx";
import { Description } from "../components/Description.tsx";
import data from "./CIE_xyz_1931_2deg.csv.ts";
import meta from "./CIE_xyz_1931_2deg.csv_metadata.json";

export function CIE_xyz_1931_2deg() {
  return (
    <Chart>
      <Description.Title meta={meta} />
      <ResponsiveContainer aspect={2}>
        <LineChart
          width={500}
          height={300}
          data={data.map(([lambda, x, y, z]) => ({ name: `${lambda}nm`, x, y, z }))}
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
          <Line type="monotone" dataKey="x" stroke="#8884d8" dot={false} />
          <Line type="monotone" dataKey="y" stroke="#82ca9d" dot={false} />
          <Line type="monotone" dataKey="z" stroke="#caa88d" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <Description meta={meta} />
    </Chart>
  );
}
