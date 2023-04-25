from rest_framework import serializers

from project.serializers import ProjectSerializer

from tracked_time.models import TrackedTime


class TrackedTimeSerializer(serializers.ModelSerializer):
    type_of_input = serializers.CharField(required=True)
    start = serializers.DateTimeField(required=False)
    stop = serializers.DateTimeField(required=False)
    time_limit = serializers.IntegerField(required=False)
    task_name = serializers.CharField(required=False)
    duration = serializers.IntegerField(required=False)
    # category = CategorySerializer(required=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = TrackedTime
        fields = '__all__'
