# Generated by Django 4.1.7 on 2023-04-13 15:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("project", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="TrackedTime",
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
                (
                    "type_of_input",
                    models.IntegerField(choices=[(1, "Manual"), (2, "Automatic")]),
                ),
                ("start", models.DateTimeField()),
                ("stop", models.DateTimeField(blank=True, null=True)),
                ("time_limit", models.IntegerField(blank=True, null=True)),
                ("task_name", models.CharField(blank=True, max_length=50)),
                (
                    "project",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.PROTECT,
                        related_name="tracked_times",
                        to="project.project",
                    ),
                ),
            ],
        ),
    ]
