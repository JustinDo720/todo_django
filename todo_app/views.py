from django.shortcuts import render

# Working with RESTapi
from rest_framework.views import APIView
from rest_framework import generics
from rest_framework.response import Response
from .models import Todo
from .serializers import TodoSerializer
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated

# Error Handler
from django.http import HttpResponse
from rest_framework import status
# Create your views here.


def index(request):
    return render(request, 'index.html')


# We are going to make API views that allows reading full todos and handle posting
class Todos(APIView):
    """
    View all of the todos in our system and handle post request

    Permission-wise we don't need to be admin to view something like this so we don't need:
        authentication_classes = [authentication.TokenAuthentication]
        permission_classes = [permissions.IsAdminUser]
    """

    permission_classes = (IsAuthenticated,)

    # Something to note: APIView always has some common methods like get or post etc
    def get(self, request, *args, **kwargs):
        """
        Returns the list of todos
        """
        # Lets make our main query set so
        queryset = Todo.objects.order_by('-order_date_added')
        # Time to Serialize which is the main idea here just serialize our data for front end to retrieve
        # Note many=True because we dont have an exact todo in terms of id or pk
        serializer = TodoSerializer(queryset, many=True)
        return Response(serializer.data)

    # Here we are going to handle posting a task
    def post(self, request):
        serializer = TodoSerializer(data=request.data)

        # Similar to our forms we got to check if the data submitted is valid after that we save and send a response
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # If the serializer is not valid then we got a bad request and we have to handle it using status
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# # Lets take a look at function based views
# @api_view(['GET', 'DELETE'])
# def remove_task(request, todo_id):
#     # Grabbing specific todo item
#     todo = Todo.objects.get(id=todo_id)
#     serializer = TodoSerializer(todo)
#
#     # We are going to remove it straight from the db that way it will update when Vue request
#     if request.method == 'DELETE':
#         todo.delete()
#
#     return Response(serializer.data)

# Show Specific Todo
class SpecificTodo(APIView):

    """
    We are going to use an id to grab a specific task which will allow the user to:
        1) Delete the Task
        2) Edit the Task
        3) Set the Task to Complete which is transferred to another list handled in our front-end
    """

    def get_object(self, todo_id):
        try:
            return Todo.objects.get(id=todo_id)
        except Exception:
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    def get(self, request, todo_id):

        specific_task = self.get_object(todo_id)
        serializer = TodoSerializer(specific_task)
        try:
            return Response(serializer.data)
        except Exception:
            # If we can't get the task that means the id is not valid its been deleted or DNE
            return HttpResponse(status=status.HTTP_404_NOT_FOUND)

    # Here we are going to remove the specific task
    def delete(self, request, todo_id):
        specific_task = self.get_object(todo_id)
        serializer = TodoSerializer(specific_task)
        specific_task.delete()
        try:
            return Response(serializer.data)
        except Exception:
            # Task was not found to delete
            return HttpResponse(status.HTTP_404_NOT_FOUND)

    # Let's handle some put tasks aka editing
    def put(self, request, todo_id):
        specific_task = self.get_object(todo_id)
        # Make sure when you work with put or post you have data=request.data because you want to retrieve the data sent
        serializer = TodoSerializer(specific_task, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

