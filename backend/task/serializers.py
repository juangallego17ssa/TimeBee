from rest_framework import serializers

from project.serializers import ProjectSerializer

from task.models import Task


class TaskSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = Task
        fields = '__all__'