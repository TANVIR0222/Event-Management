import {
  ApiResponse,
  BranchesApiResponse,
  DiscoverPayload,
  EventItem,
  PaginatedResponse,
  ViewEventPayload,
  ViewEventResponse,
} from "@/interface/discover";
import { api } from "../api/baseApi";

const discoverApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getAllDiscover: build.query<
      ApiResponse<PaginatedResponse<EventItem>>,
      DiscoverPayload
    >({
      query: ({ page, per_page, search, filter }) => ({
        url: "player/get-events",
        method: "GET",
        params: {
          page,
          per_page,
          search: search,
          filter,
        },
      }),
    }),
    getViewEvent: build.query<ViewEventResponse, ViewEventPayload>({
      query: ({ id }) => ({
        url: `player/view-event/${id}`,
        method: "GET",
      }),
      providesTags: ["followToggle", "joinEvent"],
    }),
    getAllBranch: build.query<BranchesApiResponse, void>({
      query: () => ({
        url: `/player/show-branches`,
        method: "GET",
      }),
      // providesTags: ["followToggle", "joinEvent"],
    }),
    joinSingleEvent: build.mutation<ViewEventResponse, ViewEventPayload>({
      query: ({ id }) => ({
        url: `/player/single-join/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["joinEvent"],
    }),
    joinTeamEvent: build.mutation<ViewEventResponse, ViewEventPayload>({
      query: ({ id, team_id }) => ({
        url: `/player/team-join/${id}?team_id=${team_id}`,
        method: "POST",
      }),
      invalidatesTags: ["joinEvent"],
    }),
  }),
});

export const {
  useLazyGetAllDiscoverQuery,
  useGetViewEventQuery,
  useJoinSingleEventMutation,
  useJoinTeamEventMutation,
  useGetAllBranchQuery,
} = discoverApi;
