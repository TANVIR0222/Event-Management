import { PlayerApiResponse } from "@/interface/my-profile";
import { api } from "../api/baseApi";

const myProfileApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    followToggle: build.mutation<PlayerApiResponse, { id: string }>({
      query: ({ id }) => ({
        url: `/follow-unfollow-toggle/${id}`,
        method: "POST",
      }),
      invalidatesTags: ["followToggle"],
    }),
  }),
});

export const { useFollowToggleMutation } = myProfileApi;
