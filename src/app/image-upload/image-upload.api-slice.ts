import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Data = {
  secure_url: string;
}

export const ImageUploadApiSlice = createApi({
  reducerPath: "image-upload-api",
  baseQuery: fetchBaseQuery({
    baseUrl: `https://api.cloudinary.com/v1_1/dxezgp8h3/image/upload`,
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
