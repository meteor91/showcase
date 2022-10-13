from django.core.management.base import BaseCommand, CommandError
from django.db import Error
from users.models import User

class Command(BaseCommand):
    help = 'Create user to run e2e test'

    def add_arguments(self, parser):
        parser.add_argument('username', type=str)

    def handle(self, *args, **options):
        username = options.get('username', 'test')
        print(username)

        try:
            user = User.objects.create(username=username, email='test@test.tt')
            user.set_password('test')
            user.save()
            self.stdout.write(self.style.SUCCESS('Successfully created user "%s"' % user.username))
        except Error:
            self.stdout.write(self.style.ERROR('Can t create user with username  "%s"' % username))
        