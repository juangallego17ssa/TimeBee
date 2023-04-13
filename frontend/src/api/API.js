import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_BASE_URL_PROD
  : process.env.REACT_APP_API_BASE_URL_DEV;


export const timeBeeAPI = createApi({
  reducerPath: 'timeBeeAPI',
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem('access');
        if (token) {
          headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
      },
    }),
  endpoints: (builder) => ({


    registerUser: builder.mutation({
      query: (email) => ({
        url: 'auth/registration/',
        method: 'POST',
        body: { email },
      }),
    }),
    validateRegistration: builder.mutation({
      query: (data) => ({
        url: 'auth/registration/validation/',
        method: 'POST',
        body: data,
      }),
    }),
    getToken: builder.mutation({
      query: ({ email, password }) => ({
        url: 'auth/token/',
        method: 'POST',
        body: { email, password },
      }),
      transformResponse: (response) => {
        const { access: token } = response;
        localStorage.setItem('access', token); // Store the token in local storage
        return { data: token };
      },
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: 'auth/token/refresh/',
        method: 'POST',
      }),
    }),
    verifyToken: builder.mutation({
      query: (token) => ({
        url: 'auth/token/verify/',
        method: 'POST',
        body: { token },
      }),
    }),
    resetPassword: builder.mutation({
      query: (email) => ({
        url: 'auth/password-reset/',
        method: 'POST',
        body: { email },
      }),
    }),
    validatePasswordReset: builder.mutation({
      query: (data) => ({
        url: 'auth/password-reset/validate/',
        method: 'POST',
        body: data,
      }),
    }),

    // User endpoints
    getUserProfile: builder.query({
      query: () => 'users/me/',
    }),
    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: 'users/me/',
        method: 'PATCH',
        body,
      }),
    }),
    getUsers: builder.query({
      query: () => 'users/list/',
    }),
    searchUsers: builder.query({
      query: (searchString) => ({
        url: `users/?search=${searchString}/`,
      }),
    }),
    getUserById: builder.query({
      query: (userId) => `users/${userId}/`,
    }),
  }),
});

export const {
    useRegisterUserMutation,
    useValidateRegistrationMutation,
    useGetTokenMutation,
    useRefreshTokenMutation,
    useVerifyTokenMutation,
    useResetPasswordMutation,
    useValidatePasswordResetMutation,
    //users
    useGetUserProfileQuery,
    useUpdateUserProfileMutation,
    useGetUsersQuery,
    useSearchUsersQuery,
    useGetUserByIdQuery,
  } = lunaAPI;

