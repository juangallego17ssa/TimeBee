from django.db import models


class Holiday(models.Model):
    name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return f'{self.name}'


class PublicHoliday(models.Model):
    holiday = models.ForeignKey(Holiday, on_delete=models.CASCADE, null=True)
    date = models.DateField(null=True)
    year = models.IntegerField(null=True)

    class Meta:
        unique_together = ('holiday', 'year')

    def __str__(self):
        return f'Name: {self.holiday} Year: {self.year} Date: {self.date}'
