from django.urls import path

from public_holiday.views import ListCreatePublicHolidayView, RetrieveUpdateDeletePublicHolidayView, PublicHolidayView

urlpatterns = [
    # /backend/api/publicholiday/
    path('', ListCreatePublicHolidayView.as_view(), name='public-holiday-list'),
    path('set/<int:year>/', PublicHolidayView.as_view(), name='public-holiday-generate'),
    path('<int:id>/', RetrieveUpdateDeletePublicHolidayView.as_view(), name='public-holiday-detail'),
]
