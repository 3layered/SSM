const bodyTemplate = {
    "application-id": "application_1539593635508_0064",
    "application-name":"test",
    "am-container-spec":
        {
            "local-resources":
                {
                    "entry":
                        [
                            {
                                "key":"pi",
                                "value":
                                    {
                                        "resource":"hdfs://ip-172-31-3-155.us-west-2.compute.internal:8020/user/hadoop/pi.py",
                                        "type":"FILE",
                                        "visibility":"APPLICATION",
                                        "size": 43004,
                                        "timestamp": 1539593933307
                                    }
                            }
                        ]
                },
            "commands":
                {
                    "command":"{{SPARK_HOME}}/bin/spark-submit --master yarn --executor-memory 1G /home/hadoop/pi.py"
                },
            "environment":
                {
                    "entry":
                        [
                            {
                                "key": "SPARK_HOME",
                                "value": "/usr/lib/spark"
                            }
                        ]
                }
        },
    "unmanaged-AM":false,
    "max-app-attempts":1,
    "resource":
        {
            "memory":1024,
            "vCores":1
        },
    "application-type":"SUBMIT",
    "keep-containers-across-application-attempts":false
};

export default bodyTemplate