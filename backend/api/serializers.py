from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Book,Category

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password","email","first_name","last_name"]
        extra_kwargs = {"password": {"write_only":True}}
        
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user 

        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id','name']
        
class BookSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    category = CategorySerializer(read_only=True)  # returns {id, name} instead of just an id
    category_id = serializers.PrimaryKeyRelatedField(  # used for writing
        queryset=Category.objects.all(), source='category', write_only=True
    )

    class Meta:
        model = Book
        fields = ['id', 'name', 'content', 'cover', 'status', 'created_at', 'author', 'category', 'category_id']
        extra_kwargs = {"created_at": {"read_only": True}}