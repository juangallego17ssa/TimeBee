from rest_framework import serializers

from task.serializers import TaskSerializer

from project.models import Project


class TrackedTimeSerializer(serializers.ModelSerializer):
    type_of_input = serializers.CharField(required=True)
    start = serializers.DateTimeField(required=True)
    stop = serializers.DateTimeField(required=False)
    time_limit = serializers.IntegerField(required=False)
    # category = CategorySerializer(required=True)
    task = TaskSerializer(required=True)

    class Meta:
        model = Project
        fields = '__all__'