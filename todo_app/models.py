from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager, User


# User Profile model
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    user_photo = models.ImageField(upload_to='user_profile_pictures/', default='default_profile_pic.jpg')
    user_email = models.EmailField(max_length=254, null=True, help_text='This field is not required!!')
    user_bio = models.TextField(null=True, blank=True, help_text='This field is not required!!')

    def __str__(self):
        return f'{self.user.username}'


# Define a custom user manager
class UserAccountManager(UserManager):

    # override create user method to accept email as username
    def create_user(self, email=None, password=None, **extra_fields):
        return super().create_user(email,
                                   email=email,
                                   password=password,
                                   **extra_fields)

    # override createsuperuser method to accept email as username
    def create_superuser(self, email=None, password=None, **extra_fields):
        return super().create_superuser(email,
                                        email=email,
                                        password=password,
                                        **extra_fields)


# Create your models here.
class Todo(models.Model):
    task_owner = models.ForeignKey(User, on_delete=models.CASCADE, default=None, null=True)
    task = models.CharField(max_length=600)
    task_completed = models.BooleanField(default=False)
    date_added = models.DateField(auto_now_add=True)
    order_date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.task

