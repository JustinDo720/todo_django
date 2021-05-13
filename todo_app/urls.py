from django.urls import path, include
from . import views

urlpatterns = [
    path('api/', include('rest_framework.urls')),
    path('', views.index, name='index'),
    path('show_todos/', views.ShowTodos.as_view(), name='show_todos'),
]
