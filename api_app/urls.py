from django.urls import path
from .views import AircraftList, AircraftFilter

urlpatterns = [
    path('aircraft-items/', AircraftList.as_view()),
]
