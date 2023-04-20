
from django.db import models

from project.models import Project

# def project_directory_path(instance, filename):
#     return f"project/{instance.id}/{filename}"


class TrackedTime(models.Model):
    KRANKHEIT = '01'
    UNFALL = '02'
    FERIEN = '03'
    URLAUBBEZAHLT = '04'
    URLAUBUNBEZAHLT = '05'
    MILITAERZIVILSCHUTZ = '06'
    DIENSTREISE = '07'
    AUSBILDUNG = '08'
    CATEGORY_CHOICES = (
        ("00", "Arbeit"),
        (KRANKHEIT, 'Kranheit'),
        (UNFALL, 'Unfall'),
        (FERIEN, 'Ferien'),
        (URLAUBBEZAHLT, 'Urlaub bezahlt'),
        (URLAUBUNBEZAHLT, 'Urlaub unbezahlt'),
        (MILITAERZIVILSCHUTZ, 'Militär, Zivilschutz'),
        (DIENSTREISE, 'Dienstreise'),
        (AUSBILDUNG, 'Ausbildung'),
    )

    TYPE_INPUT = [
        (0, "Clock"),
        (1, "Task"),
        (2, "Manual")
    ]

    # id
    type_of_input = models.IntegerField(choices=TYPE_INPUT)
    start = models.DateTimeField()
    stop = models.DateTimeField(null=True, blank=True)
    time_limit = models.IntegerField(null=True, blank=True)
    task_name = models.CharField(max_length=50, blank=True)
    code = models.CharField(max_length=4, choices=CATEGORY_CHOICES, default="00")
    all_day = models.BooleanField(default=False)
    project = models.ForeignKey(to=Project, on_delete=models.CASCADE, related_name="tracked_times")

    def __str__(self):
        return f'{self.id} - Task {self.task_name} - Project {self.project.name} - User {self.project.created_by.username}'

    class Meta:
        ordering = ('-start',)
