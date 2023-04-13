from django.db import models
from backend.project.models import Project


class Task(models.Model):

    # id
    name = models.CharField(max_length=50)
    project = models.ForeignKey(to=Project, on_delete=models.CASCADE, related_name="tasks")

    def __str__(self):
        return f'{self.id} - Task {self.name} - Project {self.project.name} - User {self.project.user.username}'
