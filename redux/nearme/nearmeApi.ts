import { NearMeApiResponse, NearMePayload } from "@/interface/near-me";
import { api } from "../api/baseApi";

const performanceApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getNearMeAllEvents: build.query<NearMeApiResponse, NearMePayload>({
      query: ({ latitude, longitude, search }) => ({
        url: "/player/near-me-events",
        method: "GET",
        params: { latitude, longitude, search },
      }),
    }),
  }),
});

export const { useGetNearMeAllEventsQuery } = performanceApi;
