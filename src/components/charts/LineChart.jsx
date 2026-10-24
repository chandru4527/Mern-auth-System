import {
    ResponsiveContainer,
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

const LineChart = ({
    title,
    description,
    data = [],
    dataKey = "users",
    xAxisKey = "month",
    lineColor = "#16a34a",
    height = 300,
}) => {
    return (
        <div>
            <div className="mb-5">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                {description && (
                    <p className="mt-1 text-sm text-gray-500">{description}</p>
                )}
            </div>
            {data.length > 0 ? (
                <div style={{ width: "100%", height }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey={xAxisKey} />
                            <YAxis allowDecimals={false} />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey={dataKey}
                                stroke={lineColor}
                                strokeWidth={3}
                                dot={{ r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </RechartsLineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div
                    className="flex items-center justify-center text-sm text-gray-400"
                    style={{ height }}
                >
                    No data available
                </div>
            )}
        </div>
    );
};

export default LineChart;