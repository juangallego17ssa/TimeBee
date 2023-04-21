from django.contrib import admin
from tracked_time.models import TrackedTime


class TrackedTimeAdmin(admin.ModelAdmin):
    list_display = ['id', 'start', 'stop', 'task_name', 'code']


admin.site.register(TrackedTime, TrackedTimeAdmin)
