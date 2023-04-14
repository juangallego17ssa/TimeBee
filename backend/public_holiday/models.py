from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class PublicHoliday(models.Model):
    # id
    public_holiday = models.CharField(max_length=255, unique=True)
    date = models.DateField()

    def __str__(self):
        return f'Name: {self.public_holiday} - Date: {self.date}'
