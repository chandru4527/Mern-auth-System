import { useQuery } from "@tanstack/react-query";

import { get } from "../../api/axios";
import { Endpoints } from "../../api/apiendpoints";

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ["dashboardStats"],
        queryFn: () => get(Endpoints.DASHBOARD_STATS),
        select: (response) => response.results,
    });
};