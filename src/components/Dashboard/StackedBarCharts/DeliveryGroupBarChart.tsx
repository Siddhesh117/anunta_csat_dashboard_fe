import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { DashboardGraphType } from "../../../constants/ApplicationConstants/DashboardConstant";

interface DeliveryGroupBarChartProps {
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

const getPath = (x: number = 0, y: number = 0, width: number = 0, height: number = 0): string => {
  // Validate inputs and replace NaN with 0
  x = Number.isNaN(x) ? 0 : x;
  y = Number.isNaN(y) ? 0 : y;
  width = Number.isNaN(width) ? 0 : width;
  height = Number.isNaN(height) ? 0 : height;

  // Generate SVG path
  return `
    M${x},${y + height}
    C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2},${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width},${y + height}
    Z
  `;
};

const TriangleBar = ({ fill, x = 0, y = 0, width = 0, height = 0 }: any) => {
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

const CustomizedAxisTick = (props: CustomizedAxisTickProps) => {
  const { x, y, payload } = props;
  const maxLength = 8;

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

const DeliveryGroupBarChart = (props: DeliveryGroupBarChartProps) => (
  <ResponsiveContainer width="100%" height={200}>
    {props?.barChartData && props?.barChartData?.length > 0 ? (
      <BarChart data={props?.barChartData} margin={{ top: 0, right: 0, left: -15, bottom: 40 }}>
        <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" tick={(props) => <CustomizedAxisTick {...props} />} />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend verticalAlign="bottom" align="center" wrapperStyle={{ bottom: -5 }} formatter={labelFormatter} />
        <Bar dataKey="value" stackId="a" shape={<TriangleBar />} fill={props?.color} onClick={(e) => props?.handleSelectGarph(e, DashboardGraphType.BAR_GARPH_DELIVERY_GROUP)} {...chartAnimationConfig} />
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

export default DeliveryGroupBarChart;
