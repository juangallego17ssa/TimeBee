# Generated by Django 4.1.7 on 2023-04-14 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("project", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="project",
            name="default",
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
