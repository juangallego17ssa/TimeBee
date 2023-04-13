from django.urls import path
from project.views import ListCreateProjectView, RetrieveUpdateDeleteProjectView

urlpatterns = [
    # backend/api/restaurants/
    path('', ListCreateProjectView.as_view()),
    path('<int:project_id>/', RetrieveUpdateDeleteProjectView.as_view()),

]
