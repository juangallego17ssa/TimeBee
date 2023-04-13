from rest_framework import serializers

from user.serializers import UserProjectSerializer

from project.models import Project


class ProjectSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=True)
    description = serializers.CharField(required=True)
    created_by = UserProjectSerializer(read_only=True)

    class Meta:
        model = Project
        fields = '__all__'
        extra_fields = {
            'created_by': {'read_only': True}
        }


    # def get_reviews_quantity(self, obj):
    #     return obj.reviews.count()
    #
    # def get_rating_average(self, obj):
    #     reviews = obj.reviews.all()
    #     if not reviews:
    #         return 0
    #     rating_total = 0
    #     for review in reviews:
    #         rating_total += review.rating
    #     rating_average = rating_total / len(reviews)
    #     return round(rating_average, 2)
