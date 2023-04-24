from django.contrib import admin
from tracked_time.models import TrackedTime


class TrackedTimeAdmin(admin.ModelAdmin):
    list_display = ['id', 'start', 'stop', 'task_name', 'code','get_username']

    def get_username(self, object):
        return object.project.created_by.username


admin.site.register(TrackedTime, TrackedTimeAdmin)
