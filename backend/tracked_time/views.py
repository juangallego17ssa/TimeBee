from rest_framework.response import Response
from rest_framework import status
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

    def create(self, request, *args, **kwargs):

        if request.data.get('project_id'):
            project_id = request.data.get('project_id')
            try:
                project = Project.objects.get(id=project_id)
            except Project.DoesNotExist:
                return Response({'detail': 'Project does not exist.'}, status=status.HTTP_400_BAD_REQUEST)

        else:
            project = Project.objects.get(created_by=self.request.user, default="default")

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.validated_data['project'] = project
        self.perform_create(serializer, project)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer, project):
        serializer.save(project=project)


class RetrieveUpdateDeleteTrackedTimeView(RetrieveUpdateDestroyAPIView):
    """
    """
    queryset = TrackedTime.objects.all()
    # permission_classes = [IsSameUserOrReadOnly, IsStaffOrReadOnly]
    serializer_class = TrackedTimeSerializer
    lookup_url_kwarg = 'tracked_time_id'
