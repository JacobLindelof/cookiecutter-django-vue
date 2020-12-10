from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.users.models import User
from apps.users.serializers import UserProfileSerializer


class UserProfileAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, email=self.request.user.email)
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)