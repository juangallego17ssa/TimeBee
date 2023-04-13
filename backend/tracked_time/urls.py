from django.urls import path
from tracked_time.views import ListCreateTrackedTimeView, RetrieveUpdateDeleteTrackedTimeView

urlpatterns = [
    # backend/api/restaurants/
    path('', ListCreateTrackedTimeView.as_view()),
    path('<int:tracked_time_id>/', RetrieveUpdateDeleteTrackedTimeView.as_view()),

]