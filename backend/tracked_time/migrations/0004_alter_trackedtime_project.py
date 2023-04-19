# Generated by Django 4.1.7 on 2023-04-19 07:32

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("project", "0003_project_tag_color"),
        ("tracked_time", "0003_alter_trackedtime_type_of_input"),
    ]

    operations = [
        migrations.AlterField(
            model_name="trackedtime",
            name="project",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                related_name="tracked_times",
                to="project.project",
            ),
        ),
    ]