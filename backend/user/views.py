from rest_framework import filters
# from rest_framework.response import Response
# from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from user.serializers import UserSerializer, UserUpdateSerializer
from django.contrib.auth import get_user_model
# from django.db.models import Q
from user.permissions import IsSameUser, IsStaffOrReadOnly


User = get_user_model()


class MyUserRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsSameUser]

    def get_object(self):
        return self.request.user

    # Use different serializers for get and patch methods
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        elif self.request.method == 'PATCH':
            return UserUpdateSerializer
        return UserSerializer


class RetrieveUpdateDeleteMyUserView(RetrieveUpdateDestroyAPIView):
    """
    Functionalities:
        - List the details of the current, logged-in user
        - Edit the details of the current, logged-in user
        - Delete the current, logged-in user
    Permissions:
        - Only allowed to own information of authenticated users
    """
    permission_classes = [IsAuthenticated, IsSameUser]

    def get_object(self):
        return self.request.user

    # Use different serializers for get and patch methods
    def get_serializer_class(self):
        if self.request.method == 'GET':
            return UserSerializer
        elif self.request.method == 'PATCH':
            return UserUpdateSerializer
        return UserSerializer


class ListUserView(ListAPIView):
    """
    Functionalities:
        - List all existing users
    Permissions:
        - Only allowed to authenticated users
    """
    queryset = User.objects.all()
    search_fields = ['username', 'email']
    filter_backends = [filters.SearchFilter]
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer


class SearchUserView(ListAPIView):
    """
    Functionalities:
        - Search for a specific user
    Params:
        - 'search' required (object to be displayed)
    Permissions:
        - Only allowed to authenticated users
    """
    permission_classes = [IsAuthenticated]
    serializer_class = UserSerializer

    def get_queryset(self):
        # This view should return a user based on the query param in url
        queryset = User.objects.all()
        username = self.request.query_params.get('search')
        if username is not None:
            queryset = queryset.filter(username=username)
        return queryset


class RetrieveUpdateDestroyUserView(RetrieveUpdateDestroyAPIView):
    """
    Functionalities:
        - List the details of a specific user
        - Edit the details of a specific user
        - Delete an existing user
    Params:
        - Id of user necessary
    Permissions:
        - Edit and delete functionalities only allowed to authenticated user and company's staff
    """
    queryset = User.objects.all()
    permission_classes = [IsAuthenticated, IsSameUser, IsStaffOrReadOnly]
    serializer_class = UserSerializer
    lookup_url_kwarg = 'user_id'


# class SearchView(APIView):
#     """
#     Functionalities:
#         - Search for ‘restaurants’, ‘reviews’ or ‘users’. {type: ‘restaurants’, "‘search_string’: ‘Pub’}.
#     Params:
#         - 'type' required (‘restaurants’, ‘reviews’ or ‘users’)
#         - 'search_string' required (object to be displayed)
#     """
#     permission_classes = [AllowAny]
#
#     def get(self, request):
#         search_type = request.query_params.get('type')
#         search_value = request.query_params.get('search_string')
#
#         if search_type == 'restaurants':
#             restaurants = Restaurant.objects.filter(
#                 Q(name__icontains=search_value) |
#                 Q(category__icontains=search_value) |
#                 Q(city__icontains=search_value) |
#                 Q(email__icontains=search_value) |
#                 Q(website__icontains=search_value)
#             )
#             serializer = RestaurantSerializer(restaurants, many=True)
#             return Response(serializer.data)
#
#         elif search_type == 'reviews':
#             reviews = Review.objects.filter(
#                 Q(text_content__icontains=search_value) |
#                 Q(user__username__icontains=search_value)
#             )
#             serializer = ReviewSerializer(reviews, many=True)
#             return Response(serializer.data)
#
#         elif search_type == 'users':
#             users = User.objects.filter(
#                 Q(username__icontains=search_value) |
#                 Q(first_name__icontains=search_value) |
#                 Q(last_name__icontains=search_value) |
#                 Q(email__icontains=search_value)
#             )
#             serializer = UserSerializer(users, many=True)
#             return Response(serializer.data)
#
#         else:
#             return Response({'message': 'Invalid search type.'}, status=400)
