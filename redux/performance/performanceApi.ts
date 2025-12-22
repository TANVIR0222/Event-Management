import { PerformanceApiResponse } from "@/interface/event";
import { api } from "../api/baseApi";

const performanceApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMyPerformance: build.query<PerformanceApiResponse, void>({
      query: () => ({
        url: "/organizer/performance-info",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMyPerformanceQuery } = performanceApi;
