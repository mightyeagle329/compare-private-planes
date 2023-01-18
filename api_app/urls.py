from django.urls import path
from .views import AircraftList

urlpatterns = [
    path('aircraft-items/', AircraftList.as_view()),
]
