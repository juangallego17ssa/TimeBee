# Generated by Django 4.1.7 on 2023-04-20 19:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tracked_time", "0006_trackedtime_duration"),
    ]

    operations = [
        migrations.AlterField(
            model_name="trackedtime",
            name="duration",
            field=models.IntegerField(blank=True, default="", null=True),
        ),
    ]
