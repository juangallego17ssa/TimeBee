import requests
from datetime import datetime

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from public_holiday.models import PublicHoliday, Holiday
from public_holiday.serializers import PublicHolidaySerializer


class ListCreatePublicHolidayView(ListCreateAPIView):
    """
    Functionalities:
        - List all existing public holidays
    """
    queryset = PublicHoliday.objects.all()
    permission_classes = [AllowAny]
    serializer_class = PublicHolidaySerializer

    def get_queryset(self):
        year = self.kwargs.get('year', None)
        if year is not None:
            return PublicHoliday.objects.filter(year=year).select_related('holiday')
        return super().get_queryset()


class PublicHolidayViewSet(viewsets.ModelViewSet):
    queryset = PublicHoliday.objects.all()
    serializer_class = PublicHolidaySerializer

    @action(detail=False, methods=['post'])
    def update_public_holidays(self, request):
        year = datetime.now().year
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
            url = f'https://openholidaysapi.org/PublicHolidays?countryIsoCode=CH&languageIsoCode=DE&validFrom={year}-01-01&validTo={year + 2}-12-31'
            response = requests.get(url)
            data = response.json()

            # Parse API response to get date for specified holiday name
            for holiday in data:
                if holiday['name'][0]['text'] == name:
                    date_str = holiday['startDate']
                    date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()

                    # Update corresponding entry in database with holiday date
                    holiday_obj, created = PublicHoliday.objects.get_or_create(
                        holiday=Holiday.objects.get_or_create(name=name)[0],
                        year=date_obj.year,
                        defaults={'date': date_obj}
                    )

                    if not created:
                        holiday_obj.date = date_obj
                        holiday_obj.save()

        return Response({'message': 'Public holidays updated successfully.'})
