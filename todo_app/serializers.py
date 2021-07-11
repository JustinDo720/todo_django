from .models import Todo
from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = '__all__'


# now we need to make a register serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {
            'password':{'write_only': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(username= validated_data['username'],
                                        password= validated_data['password'],
                                        )
        return user


# After we have a register we also need our user serializer to access things like id
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


# Making a custom token allows us to change or add some additional items to the access and refresh with the pair token
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Here we are setting data to inherit all traits from the parent
        data = super(MyTokenObtainPairSerializer, self).validate(attrs)

        # Once we inherit all we need to do so add some extra fields like user and id with their respective values
        data.update({'user': self.user.username})
        data.update({'id': self.user.id})

        # Once you are down updating the data you need to return the data. Next, use this serializer in views
        return data
