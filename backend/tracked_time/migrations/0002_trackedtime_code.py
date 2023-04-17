# Generated by Django 4.1.7 on 2023-04-16 08:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("tracked_time", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="trackedtime",
            name="code",
            field=models.CharField(
                choices=[
                    ("00", "Arbeit"),
                    ("01", "Kranheit"),
                    ("02", "Unfall"),
                    ("03", "Ferien"),
                    ("04", "Urlaub bezahlt"),
                    ("05", "Urlaub unbezahlt"),
                    ("06", "Militär, Zivilschutz"),
                    ("07", "Dienstreise"),
                    ("08", "Ausbildung"),
                ],
                default="00",
                max_length=4,
            ),
        ),
    ]