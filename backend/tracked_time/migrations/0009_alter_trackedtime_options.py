# Generated by Django 4.1.7 on 2023-04-22 07:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("tracked_time", "0008_alter_trackedtime_duration"),
    ]

    operations = [
        migrations.AlterModelOptions(
            name="trackedtime",
            options={"ordering": ("-start",)},
        ),
    ]
