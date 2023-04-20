from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta, time
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


class ListOwnFromView(generics.ListAPIView):
    serializer_class = TrackedTimeSerializer

    def list(self, request, *args, **kwargs):
        fromDate = request.data.get("from")
        queryset = TrackedTime.objects.filter(start__gt=fromDate, project__created_by_id=self.request.user.id)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class ListOwnTaskTodayView(generics.ListAPIView):
    serializer_class = TrackedTimeSerializer

    def list(self, request, *args, **kwargs):
        today = datetime.now().date()
        tomorrow = today + timedelta(1)
        today_start = datetime.combine(today, time())
        today_end = datetime.combine(tomorrow, time())
        queryset = TrackedTime.objects.filter(start__gte=today_start,
                                              start__lt=today_end,
                                              project__created_by_id=self.request.user.id,
                                              type_of_input="1")

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


# class ListClockView(View):
#     def get(self, request, *args, **kwargs):
#         today = datetime.now().date()
#         tomorrow = today + timedelta(1)
#         today_start = datetime.combine(today, time())
#         today_end = datetime.combine(tomorrow, time())
#         queryset = TrackedTime.objects.filter(start__gte=today_start,
#                                    start__lt=today_end,
#                                    # project__created_by_id=self.request.user.id,
#                                    type_of_input="0")
#         data = list(queryset)
#         latest_time = data.pop()
#         response_obj = {
#             "duration" : 0,
#             "latest_time": {
#                 "id" : latest_time.id,
#                 "start" : str(latest_time.start)
#             }
#         }
#
#         # for key in dir(latest_time):
#         #     if type(getattr(latest_time, key)) == datetime:
#         #         changed_value = json.dumps({response_obj["latest_time"][key]}, default=str)
#         #         response_obj["latest_time"][key] = changed_value
#
#         for timepoint in data:
#             response_obj["duration"] += (timepoint.stop - timepoint.start).total_seconds() / 3600
#
#         return JsonResponse(response_obj, status=200)

class ListClockView(generics.ListAPIView):
    serializer_class = TrackedTimeSerializer

    def list(self, request, *args, **kwargs):
        today = datetime.now().date()
        tomorrow = today + timedelta(1)
        today_start = datetime.combine(today, time())
        today_end = datetime.combine(tomorrow, time())
        queryset = TrackedTime.objects.filter(start__gte=today_start,
                                              start__lt=today_end,
                                              project__created_by_id=self.request.user.id,
                                              type_of_input="0")
        data = list(queryset)
        response_obj = {
            "duration": 0,
            "latest_time": {
                "id": "",
                "start": ""
            }
        }
        if data:
            if not data[-1].stop:
                latest_time = data.pop()
                response_obj["latest_time"]["id"] = latest_time.id
                response_obj["latest_time"]["start"] = latest_time.start
            for timepoint in data:
                response_obj["duration"] += round((timepoint.stop - timepoint.start).total_seconds())

        return JsonResponse(response_obj, status=200)
