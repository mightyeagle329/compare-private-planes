# Generated by Django 4.1.1 on 2023-01-23 09:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0005_remove_aircraft_cruise_speed_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='aircraft',
            name='make',
        ),
        migrations.AlterField(
            model_name='aircraft',
            name='aircraft_image',
            field=models.TextField(default=''),
        ),
    ]
