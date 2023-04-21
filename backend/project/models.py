from django.db import models
from django.contrib.auth import get_user_model
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


# def project_directory_path(instance, filename):
#     return f"project/{instance.id}/{filename}"


class Project(models.Model):
    # id
    name = models.CharField(max_length=50)
    description = models.TextField(max_length=200, blank=True)
    # image = models.ImageField(upload_to=project_directory_path, null=True, blank=True)
    created_by = models.ForeignKey(to=User, on_delete=models.CASCADE, related_name="created_projects")
    tag_color = models.CharField(max_length=50, blank=True)
    default = models.CharField(max_length=20, null=True, blank=True)

    def __str__(self):
        return f'{self.id} - Project {self.name} - User {self.created_by.username}'

    @receiver(post_save, sender=User)
    def callback_function(sender, instance, **kwargs):
        project, created = Project.objects.get_or_create(created_by=instance, name="unassigned", default="default",
                                                         description="no project assigned")
        if created:
            project.save()
