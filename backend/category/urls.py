from django.urls import path

from category.views import ListCreateCategoryView

urlpatterns = [
    # backend/api/category/
    path('', ListCreateCategoryView.as_view()),

]
