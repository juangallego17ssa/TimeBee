from django.db import models

from project.models import Project



# def project_directory_path(instance, filename):
#     return f"project/{instance.id}/{filename}"


class TrackedTime(models.Model):


    TYPE_INPUT = [
        (1, "Manual"),
        (2, "Automatic")
    ]

    # id
    type_of_input = models.IntegerField(choices=TYPE_INPUT)
    start = models.DateTimeField()
    stop = models.DateTimeField(null=True , blank=True)
    time_limit = models.IntegerField(null=True, blank=True)
    task_name = models.CharField(max_length=50, blank=True)
    # category = models.ForeignKey(to=Category, on_delete=models.CASCADE, related_name="tracked_times")
    project = models.ForeignKey(to=Project, on_delete=models.PROTECT, related_name="tracked_times")



    def __str__(self):
        return f'{self.id} - Task {self.task_name} - Project {self.project.name} - User {self.project.created_by.username}'
