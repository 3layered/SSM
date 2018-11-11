from django.db import models

failover_policies = [
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

    if_parent_dies = models.CharField(max_length=10, choices=failover_policies, default='IGNORE') # failover plan
    children = models.ManyToManyField('self', related_name='parents')
    submit_request = models.ForeignKey('SubmitRequest', null=True, on_delete=models.DO_NOTHING)

    def __str__(self):
        return self.app_id


class SubmitRequest(models.Model):
    app_id = models.CharField(max_length=100) # application id given by YARN
    request_data = models.CharField(max_length=5000)
