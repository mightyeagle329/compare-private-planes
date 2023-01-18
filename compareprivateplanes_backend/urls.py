from os import stat
from django.contrib import admin
from django.urls import path, include, re_path

from django.conf.urls.static import static
from django.conf import settings
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api_app.urls')),
    re_path('', TemplateView.as_view(template_name='index.html')),
]
