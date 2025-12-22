import { DiscoverPayload } from "@/interface/discover";
import { TransactionApiResponse } from "@/interface/transactionApi";
import { api } from "../api/baseApi";

const transactionApi = api.injectEndpoints({
  overrideExisting: true,
  endpoints: (build) => ({
    getMyTransaction: build.query<TransactionApiResponse, DiscoverPayload>({
      query: ({ page, per_page }) => ({
        url: "/get-transactions",
        method: "GET",
        params: {
          page,
          per_page,
        },
      }),
    }),
  }),
});

export const { useLazyGetMyTransactionQuery } = transactionApi;
