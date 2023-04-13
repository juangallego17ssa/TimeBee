from django.core.mail import send_mail
from django.http import JsonResponse
from rest_framework.generics import ListCreateAPIView, UpdateAPIView

from registration.models import Registration
from registration.serializers import RegistrationSerializer
from rest_framework.permissions import AllowAny


from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password

User = get_user_model()


class RegistrationView(ListCreateAPIView):
    serializer_class = RegistrationSerializer
    queryset = Registration.objects.all()
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        data = request.data
        if User.objects.filter(email=data['email']).exists():
            return JsonResponse({'Error': 'Email already exists'})
        else:
            username = data['email']
            user = User.objects.create(username=username, **data)
            user.save()
            validation_code = Registration.objects.filter(user_id=user.id).first().validation_code

            send_mail(
                'Registration TimeBee',
                f'Welcome to TimeBee\nThanks for registering to this amazing TimeTracker App.\nYour registration code is {validation_code}.\n ',
                'timebee.propulsion.learn@gmail.com',
                [f'{data["email"]}'],
                fail_silently=False,
            )
            return JsonResponse({'Email was sent to ': f'{data["email"]}'}, status=201)


class RegistrationValidationView(UpdateAPIView):
    serializer_class = RegistrationSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()

    def patch(self, request, *args, **kwargs):
        email_request = request.data['email']
        instance = Registration.objects.get(user__email=email_request)
        user = User.objects.get(email=email_request)
        if instance.validation_code == request.data['code']:
            request.data['password'] = make_password(request.data['password'])
            user.is_active = True
            serializer = self.get_serializer(user, data=request.data, partial=True)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse({'Success': 'User added'}, status=201)
        else:
            return JsonResponse({'Error': 'Invalid information'}, status=401)
