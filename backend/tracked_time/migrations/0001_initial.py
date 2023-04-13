# Generated by Django 4.1.7 on 2023-04-13 10:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("task", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Tracked_time",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("type_of_input", models.CharField(max_length=50)),
                ("start", models.DateTimeField()),
                ("stop", models.DateTimeField()),
                ("time_limit", models.IntegerField()),
                (
                    "task",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="tracked_times",
                        to="task.task",
                    ),
                ),
            ],
        ),
    ]
