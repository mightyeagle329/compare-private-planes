from django.urls import path
from .views import AircraftList, AircraftSearch, AircraftById, AccidentsList

urlpatterns = [
    path("search", AircraftSearch.as_view()),
    path("aircraft-items/", AircraftList.as_view()),
    path("accidents/", AccidentsList.as_view()),
    path('aircrafts/<int:id>/', AircraftById.as_view()),
]
