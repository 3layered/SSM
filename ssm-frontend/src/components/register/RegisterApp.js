import React, { Component } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import axios from "axios";
import { bodyTemplate } from "./RequestTemplate";

class RegisterApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yarnConfig: {
                server_url: '',
                emr: false,
                command: '',
                filepaths: [],
                file: '',
                memory: '1',
                core: '1',
                home: '',
                spark_home: ''
            },
        };

        this.submit = this.submit.bind(this);
        this.buildData = this.buildData.bind(this);

        this.onTextInput = this.onTextInput.bind(this);
        this.addFile = this.addFile.bind(this);
        this.emptyFilePaths = this.emptyFilePaths.bind(this);
        this.onClickCheckbox = this.onClickCheckbox.bind(this);
    }
    submit(config) {
        const backend_url = 'http://localhost:8000/api/v1/applications/submit/';
        const header = {'Content-Type': 'application/json'};

        const data = this.buildData(config);

        axios.post(backend_url, data, header)
            .then(response => {})
            .catch(error => console.log(error.message))

        this.emptyFilePaths();
    }
    buildData(config) {
        let url, command, filepaths, environment, home, spark_home;

        url = config.server_url;

        filepaths = '';
        for (const path of config.filepaths) {
            filepaths += path + ' ';
        }

        command = '{{SPARK_HOME}}/bin/spark-submit '
            + '--master yarn '
            + '--executor-memory ' + config.memory + 'G '
            + '--executor-cores ' + config.core + ' '
            + filepaths;

        if (config.emr) {
            if (config.home === '') home = '/home/hadoop';
            if (config.spark_home === '') spark_home = '/usr/lib/spark';
        } else {
            home = config.home;
            spark_home = config.spark_home;
        }

        environment =
            {
                "entry": [{"key": "SPARK_HOME", "value": spark_home},
                          {"key": "HOME", "value": home}]
            }

        const httpBody = {
            "application-id": '', // this field will be filled in backend
            "application-name": "SUBMIT",
            "am-container-spec": {
                "commands": {"command": command},
                "environment": environment
            },
            "unmanaged-AM": "false",
            "max-app-attempts": "1",
            "resource": {"memory": 1024, "vCores": 1},
            "application-type": "SUBMIT",
            "keep-containers-across-application-attempts": "false"
        };
        return {"url": url, "body": httpBody};
    }
    onTextInput = (e) => {
        const stateCopy = this.state;
        stateCopy.yarnConfig[e.target.name] =
            (typeof e.target.value === 'number') ?
                e.target.value.toString() : e.target.value;

        this.setState(stateCopy)
    };
    addFile() {
        const stateCopy = this.state;

        stateCopy.yarnConfig.filepaths = [...stateCopy.yarnConfig.filepaths,
                                             stateCopy.yarnConfig.file];
        stateCopy.yarnConfig.file = '';
        this.setState(stateCopy);
    }
    emptyFilePaths() {
        const stateCopy = this.state;
        stateCopy.yarnConfig.filepaths = [];
        this.setState(stateCopy);
    }
    onClickCheckbox() {
        const stateCopy = this.state;
        stateCopy.yarnConfig.emr = !stateCopy.yarnConfig.emr;
        this.setState(stateCopy);
    }

    render() {
        return (
            <Container style={{marginTop: '3em', marginBottom:'3em'}}>
                <h3 align="center"> Submit your app </h3>
                <Form>
                    <label>I am using Amazon EMR server</label>
                    <input type="checkbox" value={this.state.yarnConfig.emr}
                    onClick={this.onClickCheckbox}/>
                    {this.state.yarnConfig.emr ?
                        (<div>YES</div>) : (<div>NO</div>)
                    }
                    <Form.Input fluid label='Server URL'
                                value={this.state.yarnConfig.server_url}
                                onChange={this.onTextInput}
                                name="server_url"/>
                    <Form.TextArea label='File Path'
                                value={this.state.yarnConfig.file}
                                onChange={this.onTextInput}
                                name="file"/>
                    <Button  className='float-right'
                             onClick={() => this.addFile()}>
                        add file
                    </Button>
                    <Container>
                        {this.state.yarnConfig.filepaths}
                    </Container>

                    <Form.Group widths='equal'>
                            <Form.Input fluid label='Memory Requirement(GB)'
                                        value={this.state.yarnConfig.memory}
                                        onChange={this.onTextInput}
                                        name="memory"/>
                            <Form.Input fluid label='Virtual Core'
                                        value={this.state.yarnConfig.core}
                                        onChange={this.onTextInput}
                                        name="core"/>
                    </Form.Group>
                    <Form.Group widths='equal'>
                        <Form.TextArea label='Home dir'
                                       value={this.state.yarnConfig.home}
                                       onChange={this.onTextInput}
                                       name="home"/>

                        <Form.TextArea label='Spark home dir'
                                       value={this.state.yarnConfig.spark_home}
                                       onChange={this.onTextInput}
                                       name="spark_home"/>
                    </Form.Group>
                </Form>
                <Container textAlign="right">
                    <Button  className='float-right' onClick={() => this.submit(this.state.yarnConfig)}>
                        submit
                    </Button>
                </Container>
            </Container>
        );
    }
}


export default RegisterApp