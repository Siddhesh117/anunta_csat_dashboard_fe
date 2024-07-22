import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardGraphType } from "../../../constants/ApplicationConstants/DashboardConstant";

interface LocationBarChartProps {
  barChartData: any;
  color: string;
  handleSelectGarph?: any;
}

interface CustomizedAxisTickProps {
  x: number;
  y: number;
  payload: { value: string };
}

const truncateLabel = (label: string, maxLength: number): string => {
  if (label.length > maxLength) {
    return `${label.slice(0, maxLength)}...`;
  }
  return label;
};

const CustomizedAxisTick = (props: CustomizedAxisTickProps) => {
  const { x, y, payload } = props;
  const maxLength = 9; // Set your desired character limit here

  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16} textAnchor="end" fill="#666" transform="rotate(-45)">
        {truncateLabel(payload.value, maxLength)}
      </text>
    </g>
  );
};

// Custom label formatter
const labelFormatter = (data: any) => {
  const labelsMap: any = {
    value: "Issue Reported"
  };
  return labelsMap[data] || data;
};

const chartAnimationConfig = {
  animationBegin: 0,
  animationDuration: 0
};

const LocationBarChart = (props: LocationBarChartProps) => (
  <ResponsiveContainer width="100%" height={200}>
    {props?.barChartData && props?.barChartData?.length > 0 ? (
      <BarChart data={props?.barChartData} margin={{ top: 0, right: 0, left: -15, bottom: 40 }}>
        <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" tick={(props) => <CustomizedAxisTick {...props} />} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" wrapperStyle={{ bottom: -5 }} formatter={labelFormatter} />
        <Bar dataKey="value" stackId="a" fill={props?.color} onClick={(e) => props?.handleSelectGarph(e, DashboardGraphType.BAR_GARPH_LOCATION)} {...chartAnimationConfig} />
      </BarChart>
    ) : (
      <svg width="100%" height={260}>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="h3">
          No data available!
        </text>
      </svg>
    )}
  </ResponsiveContainer>
);

export default LocationBarChart;
