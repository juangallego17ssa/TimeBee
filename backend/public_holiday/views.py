import requests
from datetime import datetime

from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response

from public_holiday.models import PublicHoliday
from public_holiday.serializers import PublicHolidaySerializer


class ListCreatePublicHolidayView(ListCreateAPIView):
    """
    Functionalities:
        - List all existing public holidays
    """
    queryset = PublicHoliday.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PublicHolidaySerializer


class RetrieveUpdateDeletePublicHolidayView(RetrieveUpdateDestroyAPIView):
    """
    """
    queryset = PublicHoliday.objects.all()
    # permission_classes = [IsSameUserOrReadOnly, IsStaffOrReadOnly]
    serializer_class = PublicHolidaySerializer
    lookup_url_kwarg = 'id'


class PublicHolidayView(APIView):
    permission_classes = [AllowAny]
    lookup_url_kwarg = 'year'
    year = lookup_url_kwarg

    def get(self, request, year):
        # Define list of public holiday names to prefill
        holiday_names = [
            "Neujahrstag",
            "Berchtoldstag",
            "Karfreitag",
            "Ostermontag",
            "Tag der Arbeit",
            "Auffahrt",
            "Pfingstmontag",
            "Bundesfeiertag",
            "Weihnachten",
            "Stephanstag",
        ]

        # Iterate over each holiday name
        for name in holiday_names:
            # Make API call to fetch public holidays data
            url = 'https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&validFrom=' + str(
                year) + '-01-01&validTo=' + str(year) + '-12-31'
            response = requests.get(url)
            data = response.json()

            # Parse API response to get date for specified holiday name
            for holiday in data:
                if holiday['name'][0]['text'] == name:
                    date_str = holiday['startDate']
                    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

                    # Update corresponding entry in database with holiday date
                    try:
                        holiday_obj = PublicHoliday.objects.get(public_holiday=name)
                        holiday_obj.date = date_obj
                        holiday_obj.save()
                    except PublicHoliday.DoesNotExist:
                        # If no entry exists for holiday name, create new entry
                        holiday_obj = PublicHoliday(public_holiday=name, date=date_obj)
                        holiday_obj.save()

        return Response('Public holidays updated successfully.')
