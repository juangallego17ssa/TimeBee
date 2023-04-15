from rest_framework import serializers

from public_holiday.models import PublicHoliday


class PublicHolidaySerializer(serializers.ModelSerializer):
    holiday_name = serializers.ReadOnlyField(source='holiday.name')

    class Meta:
        model = PublicHoliday
        fields = ('holiday_name', 'date', 'year')
