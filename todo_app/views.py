from django.shortcuts import render

# Working with RESTapi
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer
# Create your views here.


def index(request):
    return render(request, 'index.html')


# We are going to make API views and its only in read mode for right now
class ShowTodos(generics.RetrieveAPIView):
    """
    View all of the todos in our system

    Permission-wise we don't need to be admin to view something like this so we don't need:
        authentication_classes = [authentication.TokenAuthentication]
        permission_classes = [permissions.IsAdminUser]
    """

    # Lets make our main query set so
    queryset = Todo.objects.all()

    # Something to note: APIView always has some common methods like get or post etc
    def get(self, request, *args, **kwargs):
        """
        Returns the list of todos
        """
        # we could get our queryset so
        queryset = self.get_queryset()
        # Time to Serialize which is the main idea here just serialize our data for front end to retrieve
        # Note many=True because we dont have an exact todo in terms of id or pk
        serializer = TodoSerializer(queryset, many=True)
        return Response(serializer.data)