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
import data from "./CIE_std_illum_D50.csv.ts";
import meta from "./CIE_std_illum_D50.csv_metadata.json";

export function CIE_std_illum_D50() {
  return (
    <Chart>
      <Description.Title meta={meta} />
      <ResponsiveContainer aspect={2}>
        <LineChart data={data.map(([lambda, v]) => ({ name: `${lambda}nm`, v }))}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="v" stroke="#8884d8" dot={false} />
        </LineChart>
      </ResponsiveContainer>
      <Description meta={meta} />
    </Chart>
  );
}
