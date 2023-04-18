import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl = 'https://timebee.propulsion-learn.ch/backend/api/'
// const baseUrl = process.env.NODE_ENV === 'production'
//   ? process.env.REACT_APP_API_BASE_URL_PROD
//   : process.env.REACT_APP_API_BASE_URL_DEV;


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
    }),tagTypes: ['Tasks','Project'],
  endpoints: (builder) => ({

    registerUser: builder.mutation({
      query: (email) => ({
        url: 'registration/',
        method: 'POST',
        body: { email },
      }),
    }),

    validateRegistration: builder.mutation({
      query: (data) => ({
        url: 'registration/validate/',
        method: 'PATCH',
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
      query: () => 'me/',
    }),

    updateUserProfile: builder.mutation({
      query: (body) => ({
        url: 'me/',
        method: 'PATCH',
        body,
      }),
    }),
    
    // searchUsers: builder.query({
    //   query: (searchString) => ({
    //     url: `users/?search=${searchString}/`,
    //   }),
    // }),

    //Public Holidays
    getpublicHolidayYear: builder.query({
      query: (year) => `publicholiday/${year}/`,
    }),

    //Category
    getCategory: builder.query({
      query: () => 'category/',
    }),

    //Projects/Task
    getProjects: builder.query({
      query: () => 'projects/'
    }),

    getOwnProjects: builder.query({
      query: () => 'projects/own/',
      providesTags:['Project']
    }),

    createProjects: builder.mutation({
      query: (body) => ({
        url: 'projects/',
        method: 'POST',
        body,
      }),
      invalidatesTags:['Project']
    }),

    getProjectByID: builder.query({
      query: (projectId) => `projects/${projectId}/`
    }),

    updateProjectByID: builder.mutation({
      query: (projectId, body) => ({
        url: `projects/${projectId}/`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags:['Project']
    }),

    deleteProjectByID: builder.mutation({
      query: (projectId) => ({
        url: `projects/${projectId}/`,
        method: 'DELETE',
      }),
      invalidatesTags:['Project']
    }),

    createProjectByUsername: builder.mutation({
      query: (body) => ({
        url: 'projects/createbyusername/',
        method: 'POST',
        body,
      }),
    }),

    //Tracked Time
    getTrackedTime: builder.query({
      query: () => 'trackedtime',
      providesTags:['Tasks']
    }),

    getOwnTrackedTime: builder.query({
      query: () => 'trackedtime/own/',
      providesTags:['Tasks']
    }),

    createTrackedTime: builder.mutation({
      query: (body) => ({
        url: 'trackedtime/',
        method: 'POST',
        body,
      }),
      invalidatesTags:['Tasks']
    }),

    getTrackedTimeByID: builder.query({
      query: (trackedtimeId) => `trackedtime/${trackedtimeId}/`,
      providesTags:['Tasks']
    }),

    updateTrackedTimeByID: builder.mutation({
      query: ({trackedtimeId, ...data}) => ({
        url: `trackedtime/${trackedtimeId}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags:['Tasks']
    }),

    deleteTrackedTimeByID: builder.mutation({
      query: (trackedtimeId) => ({
        url: `trackedtime/${trackedtimeId}/`,
        method: 'DELETE',
      }),
      invalidatesTags:['Tasks']
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
    //Public Holidays
    useGetpublicHolidayYearQuery,
    //Category
    useGetCategoryQuery,
    //Projects
    useGetProjectsQuery,
    useGetOwnProjectsQuery,
    useCreateProjectsMutation,
    useGetProjectByIDQuery,
    useUpdateProjectByIDMutation,
    useDeleteProjectByIDMutation,
    useCreateProjectByUsernameMutation,
    //TrackedTime
    useGetTrackedTimeQuery,
    useGetOwnTrackedTimeQuery,
    useCreateTrackedTimeMutation,
    useGetTrackedTimeByIDQuery,
    useUpdateTrackedTimeByIDMutation,
    useDeleteTrackedTimeByIDMutation,
  } = timeBeeAPI;

