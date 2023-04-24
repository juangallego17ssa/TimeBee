from rest_framework import serializers

from project.serializers import ProjectSerializer

from tracked_time.models import TrackedTime


class TrackedTimeSerializer(serializers.ModelSerializer):
    type_of_input = serializers.CharField(required=True)
    start = serializers.DateTimeField()
    stop = serializers.DateTimeField()
    time_limit = serializers.IntegerField()
    task_name = serializers.CharField()
    duration = serializers.IntegerField()
    # category = CategorySerializer(required=True)
    project = ProjectSerializer(read_only=True)

    class Meta:
        model = TrackedTime
        fields = '__all__'
