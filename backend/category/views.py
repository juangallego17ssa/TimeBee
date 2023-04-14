from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import AllowAny

from category.models import Category
from category.serializers import CategorySerializer


class ListCreateCategoryView(ListCreateAPIView):
    """
    Functionalities:
        - List all existing categories
    """
    queryset = Category.objects.all()
    permission_classes = [AllowAny]
    serializer_class = CategorySerializer
