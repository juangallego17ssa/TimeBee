import random

from django.contrib.auth import get_user_model
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

User = get_user_model()


def code_generator(length=6):
    numbers = '0123456789'
    return ''.join(random.choice(numbers) for _ in range(length))


class Registration(models.Model):
    validation_code = models.TextField(
        help_text='random code used for registration and for password reset',
        max_length=15,
        default=code_generator
    )
    user = models.OneToOneField(to=User, on_delete=models.CASCADE, related_name='user_registration')

    def __str__(self):
        return f'{self.id} - Registration profile for {self.user.username}'


@receiver(post_save, sender=User)
def callback_function(sender, instance, **kwargs):
    profile, created = Registration.objects.get_or_create(user=instance)
    if created:
        profile.save()
