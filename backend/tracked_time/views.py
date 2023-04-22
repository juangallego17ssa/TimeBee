from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import AllowAny
from datetime import datetime, timedelta, time
from project.models import Project
from tracked_time.models import TrackedTime
from tracked_time.serializers import TrackedTimeSerializer
import pytz


# Create your views here.

class ListCreateTrackedTimeView(ListCreateAPIView):
    """
    Functionalities:
        - List all existing projects
    """
    serializer_class = TrackedTimeSerializer

    def get_queryset(self):
        queryset = TrackedTime.objects.filter(project__created_by=self.request.user)

        start_date_str = self.request.query_params.get('start_date')
        end_date_str = self.request.query_params.get('end_date')

        if start_date_str and end_date_str:
            # Assuming the date format passed through query params is YYYY-MM-DD
            start_date = datetime.strptime(start_date_str, '%Y-%m-%d').date()
            end_date = datetime.strptime(end_date_str, '%Y-%m-%d').date()

            queryset = queryset.filter(start__date__gte=start_date, start__date__lte=end_date)

        return queryset

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
        type_of_input = self.request.query_params.get('type_of_input')
        if type_of_input:
            queryset = queryset.filter(type_of_input=self.request.query_params.get('type_of_input'))
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
        # duration = datetime.fromisoformat(request.data["stop"])-instance.start
        if request.data.get('stop'):
            stop = datetime.strptime(request.data["stop"], "%Y-%m-%dT%H:%M:%S.%fZ")
            start = instance.start.astimezone(pytz.utc).replace(tzinfo=None)
            duration = stop - start
            data = request.data
            data["duration"] = round(duration.total_seconds())
            # stop = request.data.stop

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
                                              type_of_input="0").order_by("id")
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


class ListOwnFromToClockView(generics.ListAPIView):
    serializer_class = TrackedTimeSerializer

    def list(self, request, *args, **kwargs):
        fromDate = datetime.strptime(request.data.get("from"), "%Y-%m-%d").date()
        toDate = datetime.strptime(request.data.get("to"), "%Y-%m-%d").date()
        # timeOffset = request.data.get("time_offset")
        # today = datetime.now().date()

        toDateAfter = toDate + timedelta(1)

        startDate = datetime.combine(fromDate, time())
        endDate = datetime.combine(toDateAfter, time())

        queryset = TrackedTime.objects.filter(start__gte=startDate,
                                              start__lte=endDate,
                                              project__created_by_id=self.request.user.id,
                                              type_of_input="0").order_by("id")
        data = list(queryset)
        response_arr = []
        response_week_arr = []
        response_month_arr = []
        response_week_obj = {}
        response_month_obj = {}

        def calculateTime(total_seconds):
            hours, remainder = divmod(total_seconds, 3600)
            minutes, seconds = divmod(remainder, 60)
            result = time(int(hours), int(minutes), int(seconds))
            return result

        if data:

            for trackedTime in data:

                target_tz = pytz.timezone('Europe/Zurich')
                trackedStartInTZ = trackedTime.start.astimezone(target_tz)
                trackedStopInTZ = trackedTime.stop.astimezone(target_tz)

                flag = True

                for response in response_arr:

                    if response["date"] == trackedStartInTZ.date():
                        response["duration"] += trackedTime.duration
                        if response["first_clock"] > trackedStartInTZ:
                            response["first_clock"] = trackedStartInTZ
                        if response["last_clock"] < trackedStopInTZ:
                            response["last_clock"] = trackedStopInTZ
                        response["time_span"] = round(
                            (response["last_clock"] - response["first_clock"]).total_seconds())
                        response["breaks"] += 1
                        flag = False
                        break
                if flag:
                    response_obj = {
                        "date": "",
                        "duration": 0,
                        "first_clock": "",
                        "last_clock": "",
                        "time_span": 0,
                        "breaks": 0
                    }
                    response_obj["date"] = trackedStartInTZ.date()
                    response_obj["duration"] = trackedTime.duration
                    response_obj["first_clock"] = trackedStartInTZ
                    response_obj["last_clock"] = trackedStopInTZ
                    response_obj["time_span"] = round(
                        (response_obj["last_clock"] - response_obj["first_clock"]).total_seconds())
                    response_obj["breaks"] = 0
                    response_arr.append(response_obj)

            for day in response_arr:

                flag = True

                for response_week_obj in response_week_arr:
                    isoDate = datetime.combine(day["date"], datetime.min.time()).isocalendar()
                    if response_week_obj["year"] == isoDate.year and response_week_obj["week"] == isoDate.week:
                        response_week_obj["amount_days"] += 1
                        response_week_obj["duration_total"] += day["duration"]
                        response_week_obj["duration_average"] = round(
                            response_week_obj["duration_total"] / response_week_obj["amount_days"])
                        response_week_obj["first_clock_sum"] += day["first_clock"].time().hour * 3600 + day[
                            "first_clock"].time().minute * 60 + day["first_clock"].time().second
                        response_week_obj["first_clock_average"] = calculateTime(
                            round(response_week_obj["first_clock_sum"] / response_week_obj["amount_days"]))
                        response_week_obj["last_clock_sum"] += day["last_clock"].time().hour * 3600 + day[
                            "last_clock"].time().minute * 60 + day["last_clock"].time().second
                        response_week_obj["last_clock_average"] = calculateTime(
                            round(response_week_obj["last_clock_sum"] / response_week_obj["amount_days"]))
                        response_week_obj["time_span_total"] += day["time_span"]
                        response_week_obj["time_span_average"] = round(
                            response_week_obj["time_span_total"] / response_week_obj["amount_days"])
                        response_week_obj["breaks_total"] += day["breaks"]
                        response_week_obj["breaks_average"] = round(
                            response_week_obj["breaks_total"] / response_week_obj["amount_days"])
                        flag = False
                        break

                if flag:
                    response_week_obj = {
                        "year": "",
                        "week": "",
                        "amount_days": 0,
                        "duration_total": 0,
                        "duration_average": 0,
                        "first_clock_sum": 0,
                        "first_clock_average": "",
                        "last_clock_sum": 0,
                        "last_clock_average": "",
                        "time_span_total": 0,
                        "time_span_average": 0,
                        "breaks_total": 0,
                        "breaks_average": 0
                    }
                    response_week_obj["year"] = datetime.combine(day["date"], datetime.min.time()).isocalendar().year
                    response_week_obj["week"] = datetime.combine(day["date"], datetime.min.time()).isocalendar().week
                    response_week_obj["amount_days"] = 1
                    response_week_obj["duration_total"] = day["duration"]
                    response_week_obj["duration_average"] = round(
                        response_week_obj["duration_total"] / response_week_obj["amount_days"])
                    response_week_obj["first_clock_sum"] = day["first_clock"].time().hour * 3600 + day[
                        "first_clock"].time().minute * 60 + day["first_clock"].time().second
                    response_week_obj["first_clock_average"] = calculateTime(
                        round(response_week_obj["first_clock_sum"] / response_week_obj["amount_days"]))
                    response_week_obj["last_clock_sum"] = day["last_clock"].time().hour * 3600 + day[
                        "last_clock"].time().minute * 60 + day["last_clock"].time().second
                    response_week_obj["last_clock_average"] = calculateTime(
                        round(response_week_obj["last_clock_sum"] / response_week_obj["amount_days"]))
                    response_week_obj["time_span_total"] = day["time_span"]
                    response_week_obj["time_span_average"] = round(
                        response_week_obj["time_span_total"] / response_week_obj["amount_days"])
                    response_week_obj["breaks_total"] = day["breaks"]
                    response_week_obj["breaks_average"] = round(
                        response_week_obj["breaks_total"] / response_week_obj["amount_days"])
                    response_week_arr.append(response_week_obj)

            for day in response_arr:

                flag = True

                for response_month_obj in response_month_arr:
                    if response_month_obj["year"] == day["date"].year and response_month_obj["month"] == day["date"].month:
                        response_month_obj["amount_days"] += 1
                        response_month_obj["duration_total"] += day["duration"]
                        response_month_obj["duration_average"] = round(
                            response_month_obj["duration_total"] / response_month_obj["amount_days"])
                        response_month_obj["first_clock_sum"] += day["first_clock"].time().hour * 3600 + day[
                            "first_clock"].time().minute * 60 + day["first_clock"].time().second
                        response_month_obj["first_clock_average"] = calculateTime(
                            round(response_month_obj["first_clock_sum"] / response_month_obj["amount_days"]))
                        response_month_obj["last_clock_sum"] += day["last_clock"].time().hour * 3600 + day[
                            "last_clock"].time().minute * 60 + day["last_clock"].time().second
                        response_month_obj["last_clock_average"] = calculateTime(
                            round(response_month_obj["last_clock_sum"] / response_month_obj["amount_days"]))
                        response_month_obj["time_span_total"] += day["time_span"]
                        response_month_obj["time_span_average"] = round(
                            response_month_obj["time_span_total"] / response_month_obj["amount_days"])
                        response_month_obj["breaks_total"] += day["breaks"]
                        response_month_obj["breaks_average"] = round(
                            response_month_obj["breaks_total"] / response_month_obj["amount_days"])
                        flag = False
                        break

                if flag:
                    response_month_obj = {
                        "year": "",
                        "month": "",
                        "amount_days": 0,
                        "duration_total": 0,
                        "duration_average": 0,
                        "first_clock_sum": 0,
                        "first_clock_average": "",
                        "last_clock_sum": 0,
                        "last_clock_average": "",
                        "time_span_total": 0,
                        "time_span_average": 0,
                        "breaks_total": 0,
                        "breaks_average": 0
                    }
                    response_month_obj["year"] = day["date"].year
                    response_month_obj["month"] = day["date"].month
                    response_month_obj["amount_days"] = 1
                    response_month_obj["duration_total"] = day["duration"]
                    response_month_obj["duration_average"] = round(
                        response_month_obj["duration_total"] / response_month_obj["amount_days"])
                    response_month_obj["first_clock_sum"] = day["first_clock"].time().hour * 3600 + day[
                        "first_clock"].time().minute * 60 + day["first_clock"].time().second
                    response_month_obj["first_clock_average"] = calculateTime(
                        round(response_month_obj["first_clock_sum"] / response_month_obj["amount_days"]))
                    response_month_obj["last_clock_sum"] = day["last_clock"].time().hour * 3600 + day[
                        "last_clock"].time().minute * 60 + day["last_clock"].time().second
                    response_month_obj["last_clock_average"] = calculateTime(
                        round(response_month_obj["last_clock_sum"] / response_month_obj["amount_days"]))
                    response_month_obj["time_span_total"] = day["time_span"]
                    response_month_obj["time_span_average"] = round(
                        response_month_obj["time_span_total"] / response_month_obj["amount_days"])
                    response_month_obj["breaks_total"] = day["breaks"]
                    response_month_obj["breaks_average"] = round(
                        response_month_obj["breaks_total"] / response_month_obj["amount_days"])
                    response_month_arr.append(response_month_obj)

            sumDuration = 0
            sumStart = 0
            sumStop = 0
            sumBreaks = 0
            days = len(response_arr)
            for day in response_arr:
                sumDuration += day["duration"]
                sumStart += day["first_clock"].time().hour * 3600 + day["first_clock"].time().minute * 60 + day[
                    "first_clock"].time().second
                sumStop += day["last_clock"].time().hour * 3600 + day["last_clock"].time().minute * 60 + day[
                    "last_clock"].time().second
                sumBreaks += day["breaks"]

            final_response = {
                "average": {
                    "duration": round(sumDuration / days),
                    "start": calculateTime(sumStart / days),
                    "stop": calculateTime(sumStop / days),
                    "breaks": sumBreaks / days
                },
                "detail": response_arr,
                "detail_weekly": response_week_arr,
                "detail_monthly": response_month_arr
            }

        return JsonResponse(final_response, status=200, safe=False)
