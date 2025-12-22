import { PlayerApiResponse, TeamApiResponse } from "@/interface/my-profile";
import { api } from "../api/baseApi";

const myProfileApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMyProfile: build.query<PlayerApiResponse, void>({
      query: () => ({
        url: "player/player-profile-info",
        method: "GET",
      }),
    }),
    getMyAllTeam: build.query<TeamApiResponse, void>({
      query: () => ({
        url: "/player/get-teams",
        method: "GET",
      }),
    }),
    updatedProfile: build.mutation<any, any>({
      query: (formData) => ({
        url: "/edit-profile",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
      invalidatesTags: ["updatedProfile"],
    }),
  }),
});

export const {
  useGetMyProfileQuery,
  useUpdatedProfileMutation,
  useGetMyAllTeamQuery,
} = myProfileApi;
