from django.urls import path
from registration.views import RegistrationView, RegistrationValidationView

urlpatterns = [
    # backend/api/registration/
    path('', RegistrationView.as_view()),
    path('validate/', RegistrationValidationView.as_view()),
]
