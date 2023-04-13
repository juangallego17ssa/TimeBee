from django.db import models

from task.models import Task



def project_directory_path(instance, filename):
    return f"project/{instance.id}/{filename}"


class Tracked_time(models.Model):

    # id
    type_of_input = models.CharField(max_length=50)
    start = models.DateTimeField()
    stop = models.DateTimeField()
    time_limit = models.IntegerField()
    # category = models.ForeignKey(to=Category, on_delete=models.CASCADE, related_name="tracked_times")
    task = models.ForeignKey(to=Task, on_delete=models.PROTECT, related_name="tracked_times")



    def __str__(self):
        return f'{self.id} - TimeTracked - Task {self.name} - Project {self.project.name} - User {self.project.user.username}'
