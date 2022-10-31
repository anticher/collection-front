import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Data = {
  secure_url: string;
};

export const ImageUploadApiSlice = createApi({
  reducerPath: "image-upload-api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_LOAD_IMAGE_URL,
  }),
  endpoints: (builder) => ({
    sendImage: builder.mutation<Data, FormData>({
      query: (credentials) => ({
        url: "/",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const { useSendImageMutation } = ImageUploadApiSlice;
