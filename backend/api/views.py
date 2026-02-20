from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from .serializers import UserSerializer,BookSerializer, CategorySerializer
from .models import Book, Category

class BookListCreate(generics.ListCreateAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Book.objects.all()
    
    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class BookUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Book.objects.filter(author=self.request.user)

class ListCategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
            
class BookDelete(generics.DestroyAPIView):
    serializer_class = BookSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        return Book.objects.filter(author=user)
        

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

class UserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    # Optional: Ensure users can only update themselves
    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)