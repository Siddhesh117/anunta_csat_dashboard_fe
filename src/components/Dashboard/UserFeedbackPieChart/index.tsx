import React from "react";
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from "recharts";
import { FeedbackChartData } from "../../../shared/interface/dashboard.interface";
import { General } from "../../../util/General";
import { DashboardGraphType } from "../../../constants/ApplicationConstants/DashboardConstant";

const COLORS = ["#0088FE", "green", "#FFBB28", "#FF8042", "red"];

const RADIAN = Math.PI / 180;

interface CustomizedLabelProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface UserFeedbackPieChartProps {
  data: FeedbackChartData[] | undefined;
  handleSelectGarph?: any;
}

interface DataPoint {
  name: string;
  value: number;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DataPoint }>;
}

const renderCustomizedLabel: React.FC<CustomizedLabelProps> = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

/* custom tool tip */
const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="custom-tooltip" style={{ border: "1px solid grey", background: "rgba(255, 255, 255, 0.9)", color: "#5484BE", textAlign: "center", padding: "9px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "5px" }}>
        <p className="label" style={{ margin: 0 }}>{`${data.name}: ${General.numberWithCommas(String(data.value ?? "0"))}`}</p>
      </div>
    );
  }
  return null;
};

const UserFeedbackPieChart = (props: UserFeedbackPieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height={330}>
      {props?.data && props?.data?.length > 0 && (props?.data?.[0]?.["value"] !== 0 || props?.data?.[1]?.["value"] !== 0 || props?.data?.[2]?.["value"] !== 0 || props?.data?.[3]?.["value"] !== 0 || props?.data?.[4]?.["value"] !== 0) ? (
        <PieChart>
          <Tooltip content={<CustomTooltip />} />
          <Legend verticalAlign="bottom" align="center" />
          <Pie dataKey="value" data={props?.data ?? []} labelLine={false} onClick={(e) => props?.handleSelectGarph(e, DashboardGraphType.PIE_CHART_USER_FEEDBACK)} label={renderCustomizedLabel} outerRadius={100} animationBegin={0} animationDuration={0} fill="#003366">
            {props?.data?.map((entry: any, index: any) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
      ) : (
        <svg width="100%" height={330}>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="h3">
            No data available!
          </text>
        </svg>
      )}
    </ResponsiveContainer>
  );
};

export default UserFeedbackPieChart;
