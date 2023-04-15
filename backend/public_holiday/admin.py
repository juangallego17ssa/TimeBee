from django.contrib import admin

from public_holiday.models import Holiday, PublicHoliday
from public_holiday.views import PublicHolidayViewSet


class PublicHolidayAdmin(admin.ModelAdmin):
    list_display = ('holiday', 'year', 'date')
    list_filter = ('year',)
    actions = ['update_public_holidays']

    def update_public_holidays(self, request, queryset):
        view = PublicHolidayViewSet()
        response = view.update_public_holidays(request)
        self.message_user(request, response.data['message'])

    update_public_holidays.short_description = "Update public holidays"


admin.site.register(Holiday)
admin.site.register(PublicHoliday, PublicHolidayAdmin)
