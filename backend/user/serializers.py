from rest_framework import serializers

from user.models import User


class UserProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']
