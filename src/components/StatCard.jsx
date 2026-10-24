const StatCard = ({
    title,
    value = 0,
    icon: Icon,
    iconClassName = "",
    percentage,
    description = "from last month",
    isLoading = false,
}) => {
    const isPositive = percentage > 0;
    const isNegative = percentage < 0;

    return (
        <div className="group rounded-md border border-gray-100 bg-white p-3 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-500">{title}</p>

                    <h3 className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                        {isLoading ? (
                            <span className="animate-pulse text-gray-900">...</span>
                        ) : (
                            value
                        )}
                    </h3>
                </div>

                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconClassName} transition-transform duration-300 group-hover:scale-110`}
                >
                    <Icon size={25} />
                </div>
            </div>

            {!isLoading && percentage !== undefined && (
                <div className="mt-2 flex items-center gap-2">
                    <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${isPositive
                                ? " text-green-600"
                                : isNegative
                                    ? " text-red-600"
                                    : " text-gray-500"
                            }`}
                    >
                        {isPositive ? "+" : ""}
                        {percentage}%
                    </span>

                    <span className="text-xs text-gray-400">{description}</span>
                </div>
            )}
        </div>
    );
};

export default StatCard;