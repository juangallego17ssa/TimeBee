from django.urls import path

from user.views import ListUserView, SearchUserView, RetrieveUpdateDestroyUserView

urlpatterns = [
    # backend/api/users/
    path('list/', ListUserView.as_view()),
    path('', SearchUserView.as_view()),
    path('<int:user_id>/', RetrieveUpdateDestroyUserView.as_view()),
]
