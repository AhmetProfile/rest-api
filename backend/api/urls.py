from django.urls import path
from . import views

urlpatterns = [
    path("books/", views.BookListCreate.as_view(), name='note-list'),
    path("books/delete/<int:pk>/", views.BookDelete.as_view(), name='note-delete')
]
