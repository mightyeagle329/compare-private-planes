# Generated by Django 4.1.1 on 2023-03-17 12:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api_app', '0011_aircraft_fleet_flight_link'),
    ]

    operations = [
        migrations.CreateModel(
            name='UsersModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, default='', max_length=200, null=True)),
                ('email', models.CharField(blank=True, max_length=200, null=True)),
            ],
        ),
    ]
