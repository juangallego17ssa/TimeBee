from django.urls import path
from project.views import ListCreateProjectView, RetrieveUpdateDeleteProjectView, ListOwnProjectView, \
    CreateByUsernameView

urlpatterns = [
    # backend/api/restaurants/
    path('', ListCreateProjectView.as_view()),
    path('own/', ListOwnProjectView.as_view()),
    path('<int:project_id>/', RetrieveUpdateDeleteProjectView.as_view()),
    path('createbyusername/', CreateByUsernameView.as_view()),
]
