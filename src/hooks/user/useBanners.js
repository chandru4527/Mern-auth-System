import { useQuery } from "@tanstack/react-query";
import { get } from "../../api/axios";
import { Endpoints } from "../../api/apiendpoints";

const BANNERS_KEY = ["banners"];

export const useActiveBanners = () => useQuery({
    queryKey: BANNERS_KEY,
    queryFn: () => get(Endpoints.BANNERS),
    select: (response) => response?.results?.banners || [],
});
