from django.contrib.auth.models import AbstractUser
from django.db import models


def user_directory_path(instance, filename):
    return f"users/{instance.id}/{filename}"


class User(AbstractUser):
    # Field used for authentication
    USERNAME_FIELD = 'email'
    # additional fields required when using createsuperuser
    REQUIRED_FIELDS = ['username']

    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    avatar = models.ImageField(upload_to=user_directory_path, null=True, blank=True)
    workload = models.IntegerField(blank=False, default=100)
    holidays = models.IntegerField(null=True, blank=True)
    background_picture = models.ImageField(upload_to=user_directory_path, null=True, blank=True)

    def __str__(self):
        return self.username
