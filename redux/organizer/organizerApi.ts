import { OrganisationsApiResponse } from "@/interface/organisation";
import { api } from "../api/baseApi";

const performanceApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getOrganizerProfile: build.query<OrganisationsApiResponse, void>({
      query: () => ({
        url: "/organizer/organizer-profile-info",
        method: "GET",
      }),
      providesTags: ["updatedProfile"],
    }),
    deleteOrganizerProfile: build.mutation<any, void>({
      query: () => ({
        url: "/delete-account",
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetOrganizerProfileQuery,
  useDeleteOrganizerProfileMutation,
} = performanceApi;
