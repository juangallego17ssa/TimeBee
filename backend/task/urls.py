from django.urls import path
from project.views import ListCreateProjectView, RetrieveUpdateDeleteProjectView

urlpatterns = [
    # backend/api/restaurants/
    path('', ListCreateProjectView.as_view()),
    path('<int:task_id>/', RetrieveUpdateDeleteProjectView.as_view()),

]