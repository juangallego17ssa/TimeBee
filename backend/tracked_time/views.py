from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from project.models import Project
from tracked_time.models import TrackedTime
from tracked_time.serializers import TrackedTimeSerializer


# Create your views here.

class ListCreateTrackedTimeView(ListCreateAPIView):
    """
    Functionalities:
        - List all existing projects
    """
    queryset = TrackedTime.objects.all()
    permission_classes = [AllowAny]
    serializer_class = TrackedTimeSerializer

    def perform_create(self, serializer):
        project = Project.objects.get(created_by=self.request.user, name="unassigned")
        serializer.save(project=project)

class RetrieveUpdateDeleteTrackedTimeView(RetrieveUpdateDestroyAPIView):
    """
    """
    queryset = TrackedTime.objects.all()
    # permission_classes = [IsSameUserOrReadOnly, IsStaffOrReadOnly]
    serializer_class = TrackedTimeSerializer
    lookup_url_kwarg = 'tracked_time_id'
