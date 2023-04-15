from django.urls import path

from public_holiday.views import ListCreatePublicHolidayView

urlpatterns = [
    # /backend/api/publicholiday/
    path('<int:year>/', ListCreatePublicHolidayView.as_view(), name='public-holiday-list'),

]
