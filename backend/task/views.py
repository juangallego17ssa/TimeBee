from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from task.models import Task
from task.serializers import TaskSerializer


# Create your views here.

class ListCreateTaskView(ListCreateAPIView):
    """
    Functionalities:
        - List all existing projects
    """
    queryset = Task.objects.all()
    permission_classes = [AllowAny]
    serializer_class = TaskSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class RetrieveUpdateDeleteTaskView(RetrieveUpdateDestroyAPIView):
    """
    """
    queryset = Task.objects.all()
    # permission_classes = [IsSameUserOrReadOnly, IsStaffOrReadOnly]
    serializer_class = TaskSerializer
    lookup_url_kwarg = 'task_id'
