from rest_framework import serializers

from backend.user.models import User


class UserProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
