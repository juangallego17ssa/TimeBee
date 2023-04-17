from rest_framework import generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny

from project.models import Project
from project.serializers import ProjectSerializer


# Create your views here.

class ListCreateProjectView(ListCreateAPIView):
    """
    Functionalities:
        - List all existing projects
    """
    queryset = Project.objects.all()
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class ListOwnProjectView(generics.ListAPIView):
    """
    """
    permission_classes = [AllowAny]
    serializer_class = ProjectSerializer

    def get_queryset(self):
        queryset = Project.objects.filter(created_by_id=self.request.user.id)
        return queryset


class RetrieveUpdateDeleteProjectView(RetrieveUpdateDestroyAPIView):
    """
    """
    queryset = Project.objects.all()
    # permission_classes = [IsSameUserOrReadOnly, IsStaffOrReadOnly]
    serializer_class = ProjectSerializer
    lookup_url_kwarg = 'project_id'
