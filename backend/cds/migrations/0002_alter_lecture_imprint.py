# Generated by Django 3.2.8 on 2022-01-24 09:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cds", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="lecture",
            name="imprint",
            field=models.CharField(max_length=30),
        ),
    ]
