from django.contrib.auth.models import AbstractUser, UserManager
from django.db import models
from django.utils.text import slugify


class CustomUserManager(UserManager):
    def get_by_natural_key(self, username):
        case_insensitive_username_field = '{}__iexact'.format(self.model.USERNAME_FIELD)
        return self.get(**{case_insensitive_username_field: username})


class User(AbstractUser):
    objects = CustomUserManager()

    email = models.EmailField(unique=True)
    slug = models.SlugField(default='', editable=False, max_length=255)

    def save(self, *args, **kwargs):
        value = self.username
        self.slug = slugify(value, allow_unicode=True)
        super().save(*args, **kwargs)