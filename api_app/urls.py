from django.urls import path
from .views import AircraftList, AircraftSearch

urlpatterns = [
    path("search/", AircraftSearch.as_view()),
    path("aircraft-items/", AircraftList.as_view()),
]
