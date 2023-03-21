from django.contrib import admin
from django.urls import path, include, re_path

from django.views.generic import TemplateView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api_app.urls')),
    path('', include('api_app.urls')),
]
