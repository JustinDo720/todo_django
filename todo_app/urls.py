from django.urls import path, include
from . import views

urlpatterns = [
    path('api/', include('rest_framework.urls')),
    path('', views.index, name='index'),
    path('todos/', views.Todos.as_view(), name='todos'),
    path('specific_todo/<int:todo_id>', views.SpecificTodo.as_view(), name='remove_task')
]
