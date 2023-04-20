from django.urls import path
from tracked_time.views import ListCreateTrackedTimeView, RetrieveUpdateDeleteTrackedTimeView, ListOwnTrackedTimeView, \
    ListOwnFromView, ListOwnTaskTodayView, ListClockView


urlpatterns = [
    # backend/api/restaurants/
    path('', ListCreateTrackedTimeView.as_view()),
    path('own/', ListOwnTrackedTimeView.as_view()),
    path('<int:tracked_time_id>/', RetrieveUpdateDeleteTrackedTimeView.as_view()),
    path('listownfrom/', ListOwnFromView.as_view()),
    path('listowntoday/', ListOwnTaskTodayView.as_view()),
    path('getclockinfo/', ListClockView.as_view())
]
