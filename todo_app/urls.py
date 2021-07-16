from django.urls import path, include
from . import views

urlpatterns = [
    path('api/', include('rest_framework.urls')),
    path('', views.index, name='index'),
    path('all_todos/', views.AllTodos.as_view(), name='all_todos'),
    path('specific_todo/<int:todo_id>', views.SpecificTodo.as_view(), name='remove_task'),
    path('todos/<int:user_id>', views.Todos.as_view(), name='todos'),
    path('register/', views.RegisterAPI.as_view(), name='register')
]
