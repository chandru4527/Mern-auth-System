import {
    ResponsiveContainer,
    PieChart as RechartsPieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
} from "recharts";

const COLORS = ["#16a34a", "#dc2626", "#9333ea", "#2563eb", "#f59e0b"];

const PieChart = ({
    title,
    description,
    data = [],
    dataKey = "value",
    nameKey = "name",
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
                        <RechartsPieChart>
                            <Pie
                                data={data}
                                dataKey={dataKey}
                                nameKey={nameKey}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={90}
                                paddingAngle={3}
                            >
                                {data.map((item, index) => (
                                    <Cell
                                        key={item[nameKey] ?? index}
                                        fill={COLORS[index % COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </RechartsPieChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex items-center justify-center text-sm text-gray-400" style={{ height }}>
                    No data available
                </div>
            )}
        </div>
    );
};

export default PieChart;