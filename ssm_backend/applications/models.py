from django.db import models

FAILOVER_POLICY_CHOICES = [
    ('cascade', 'Cascade'),
    ('ignore', 'Ignore'),
    ('retry', 'Retry')
]

# Create your models here.
class Application(models.Model):
    app_id = models.CharField(max_length=100) # application id given by YARN
    name = models.CharField(max_length=100)
    state = models.CharField(max_length=20)
    started_time = models.CharField(max_length=20)
    finished_time = models.CharField(max_length=20)
    progress = models.IntegerField(default=0)

    submit_request = models.ForeignKey('SubmitRequest', null=True, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.app_id


class SubmitRequest(models.Model):
    app_id = models.CharField(max_length=100) # application id given by YARN
    request_data = models.CharField(max_length=5000)


class Dependency(models.Model):
    parent_app = models.ForeignKey('Application', null=True, on_delete=models.DO_NOTHING, related_name='parent_dependency')
    child_app = models.ForeignKey('Application', null=True, on_delete=models.DO_NOTHING, related_name='child_dependency')
    failover_plan = models.CharField(max_length=10, choices=FAILOVER_POLICY_CHOICES, default='ignore')  # failover plan