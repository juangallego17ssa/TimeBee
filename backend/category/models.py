from django.db import models


class Category(models.Model):
    KRANKHEIT = '01'
    UNFALL = '02'
    FERIEN = '03'
    URLAUBBEZAHLT = '04'
    URLAUBUNBEZAHLT = '05'
    MILITAERZIVILSCHUTZ = '06'
    DIENSTREISE = '07'
    AUSBILDUNG = '08'
    CATEGORY_CHOICES = (
        (KRANKHEIT, 'Kranheit'),
        (UNFALL, 'Unfall'),
        (FERIEN, 'Ferien'),
        (URLAUBBEZAHLT, 'Urlaub bezahlt'),
        (URLAUBUNBEZAHLT, 'Urlaub unbezahlt'),
        (MILITAERZIVILSCHUTZ, 'Militär, Zivilschutz'),
        (DIENSTREISE, 'Dienstreise'),
        (AUSBILDUNG, 'Ausbildung'),
    )

    code = models.CharField(max_length=4, choices=CATEGORY_CHOICES)

    def __str__(self):
        return self.get_code_display()
