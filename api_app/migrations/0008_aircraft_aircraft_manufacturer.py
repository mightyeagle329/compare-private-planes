# Generated by Django 4.1.1 on 2023-02-23 21:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0007_alter_aircraft_mtow_lbs_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='aircraft',
            name='aircraft_manufacturer',
            field=models.TextField(default=''),
        ),
    ]
