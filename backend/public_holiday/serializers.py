from rest_framework import serializers

from public_holiday.models import PublicHoliday


class PublicHolidaySerializer(serializers.ModelSerializer):
    class Meta:
        model = PublicHoliday
        fields = '__all__'
