import {
  ApiResponse,
  DiscoverPayload,
  EventItem,
  PaginatedResponse,
} from "@/interface/discover";
import { ViewEventApiResponse, ViewEventResponse } from "@/interface/event";
import { api } from "../api/baseApi";

export const createdEventApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createEvent: builder.mutation<any, any>({
      query: (formData) => ({
        url: `/organizer/create-event`,
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        body: formData,
      }),
      invalidatesTags: ["createdEvent"],
    }),
    getAllMyEvent: builder.query<
      ApiResponse<PaginatedResponse<EventItem>>,
      DiscoverPayload
    >({
      query: ({ page, per_page, search, filter }) => ({
        url: `/organizer/get-events`,
        method: "GET",
        params: {
          page,
          per_page,
          search: search,
          filter,
        },
      }),
      providesTags: ["createdEvent"],
    }),
    deleteMyEvent: builder.mutation<any, any>({
      query: ({ id }) => ({
        url: `/organizer/delete-event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["createdEvent"],
    }),
    getMySingleEvent: builder.query<
      ApiResponse<PaginatedResponse<EventItem>>,
      any
    >({
      query: ({ id }) => ({
        url: `/organizer/get-event-details/${id}`,
        method: "GET",
      }),
      providesTags: ["createdEvent"],
    }),
    viewMySingleEvent: builder.query<ViewEventApiResponse, any>({
      query: ({ id }) => ({
        url: `/organizer/view-event/${id}`,
        method: "GET",
      }),
      providesTags: ["createdEvent"],
    }),
    viewMySingleEventDetails: builder.query<ViewEventResponse, any>({
      query: ({ id }) => ({
        url: `/organizer/get-event-details/${id}`,
        method: "GET",
      }),
      providesTags: ["createdEvent"],
    }),
    updatedMySingleEvent: builder.mutation<
      any,
      { formData: FormData; id: any }
    >({
      query: ({ formData, id }) => {
        // Log FormData keys and values
        console.log("--- FormData Contents RTK  ---");
        formData.forEach((value, key) => {
          console.log(key, value);
        });
        console.log("------------------------" + " " + id);

        return {
          url: `/organizer/edit-event/${id}`,
          method: "PATCH",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["createdEvent"],
    }),
  }),
});

export const {
  useCreateEventMutation,
  useLazyGetAllMyEventQuery,
  useDeleteMyEventMutation,
  useGetMySingleEventQuery,
  useUpdatedMySingleEventMutation,
  useViewMySingleEventQuery,
  useViewMySingleEventDetailsQuery,
} = createdEventApi;
