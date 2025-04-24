
import React from 'react';
import { LineChart, Line, ResponsiveContainer, Tooltip, YAxis } from 'recharts';
import { cn } from "@/lib/utils";

interface SparklineChartProps {
  data: number[];
  change: number;
  className?: string;
}

const SparklineChart: React.FC<SparklineChartProps> = ({ data, change, className }) => {
  const chartData = data.map((value, index) => ({ value, index }));
  const color = change >= 0 ? "#16a34a" : "#dc2626";

  return (
    <div className={cn("w-full h-16 min-w-[120px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={['dataMin', 'dataMax']} hide />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const value = payload[0].value as number;
                return (
                  <div className="bg-slate-800 border border-slate-700 px-2 py-1 rounded-lg text-xs">
                    ${value.toFixed(2)}
                  </div>
                );
              }
              return null;
            }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={color}
            strokeWidth={1.5}
            dot={false}
            activeDot={{ r: 4, fill: color }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SparklineChart;
