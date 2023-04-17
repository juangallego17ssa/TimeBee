from rest_framework.response import Response
from rest_framework import status, generics
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


class ListOwnTrackedTimeView(generics.ListAPIView):
    """
    """
    permission_classes = [AllowAny]
    serializer_class = TrackedTimeSerializer

    def get_queryset(self):
        queryset = TrackedTime.objects.filter(project__created_by_id=self.request.user.id)
        return queryset


class RetrieveUpdateDeleteTrackedTimeView(RetrieveUpdateDestroyAPIView):
    """
    """
    queryset = TrackedTime.objects.all()
    # permission_classes = [IsSameUserOrReadOnly, IsStaffOrReadOnly]
    serializer_class = TrackedTimeSerializer
    lookup_url_kwarg = 'tracked_time_id'

    def update(self, request, *args, **kwargs):

        if request.data.get('project_id'):
            project_id = request.data.get('project_id')
            try:
                project = Project.objects.get(id=project_id)
            except Project.DoesNotExist:
                return Response({'detail': 'Project does not exist.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            project = ""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        if project:
            serializer.validated_data['project'] = project
            self.perform_update(serializer)
        else:
            self.perform_update(serializer)

        if getattr(instance, '_prefetched_objects_cache', None):
            # If 'prefetch_related' has been applied to a queryset, we need to
            # forcibly invalidate the prefetch cache on the instance.
            instance._prefetched_objects_cache = {}

        return Response(serializer.data)
