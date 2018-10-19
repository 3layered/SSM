import React, { Component } from "react";
import { Button, Form, Container } from "semantic-ui-react";
import axios from "axios";
import { Client } from 'ssh2'

class RegisterApp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            yarnConfig: {
                appID: '',
                command: '',
                memory: '512',
                vcore: '1',
                maxAttempt: '1'
            },
        };

        this.create = this.create.bind(this);
        this.getNewAppID = this.getNewAppID.bind(this);
        this.submit = this.submit.bind(this);

        this.inputFormatCheck = this.inputFormatCheck.bind(this);
        this.inputValueCheck = this.inputValueCheck.bind(this);

        this.onTextInput = this.onTextInput.bind(this);

        this.ssh = this.ssh.bind(this);

        this.ssh();
    }
    ssh() {
        //var Client = require('ssh2').Client;
        var conn = new Client();
        conn.on('ready', function() {
            console.log('Client :: ready');
            conn.shell(function(err, stream) {
                if (err) throw err;
                stream.on('close', function() {
                    console.log('Stream :: close');
                    conn.end();
                }).on('data', function(data) {
                    console.log('STDOUT: ' + data);
                }).stderr.on('data', function(data) {
                    console.log('STDERR: ' + data);
                });
                stream.end('ls -l\nexit\n');
            });
        }).connect({
            host: 'localhost',
            port: 22,
            username: 'kyunggeun',
        });
    }
    create() {
        const config = this.state.yarnConfig;

        if (!this.inputFormatCheck(config)) {
            alert('bad input format');
            return;
        }

        config.memory = parseInt(config.memory, 10);
        config.vcore = parseInt(config.vcore, 10);
        config.maxAttempt = parseInt(config.maxAttempt, 10);

        if (!this.inputValueCheck(config)) {
            alert('bad input value');
            return;
        }

        this.getNewAppID()
            .then(response => {
                config.appID = response.data['application-id'];
                this.submit(config);
            })
            .catch(error => console.log(error));
    }
    getNewAppID() {
        const url = this.props.urlPrefix + 'cluster/apps/new-application';

        return axios.post(url);
    }
    submit(config) {
        const url = this.props.urlPrefix + 'cluster/apps';

        const header = {'Content-Type': 'application/json'};
        const body = {
            "application-id": config.appID,
            "application-name": "test",
            "am-container-spec":
                {

                    "commands":
                        {
                            "command": config.command //"/home/kyunggeun/spark-2.3.2/bin/spark-submit --master yarn /home/kyunggeun/spark-submit-example/target/scala-2.11/sparkpi_2.11-1.0.jar"
                        }
                },
            "unmanaged-AM": false,
            "max-app-attempts": config.maxAttempt,
            "resource":
                {
                    "memory": config.memory,
                    "vCores": config.vcore
                },
            "application-type": "YARN",
            "keep-containers-across-application-attempts": false
        };

        axios.post(url, body, header)
            .then(response => {})
            .catch(error => console.log(error.message))
    }
    inputFormatCheck(yarnConfig) {
        const re = new RegExp('^[0-9]+$');

        return yarnConfig.memory.match(re) &&
            yarnConfig.vcore.match(re) &&
            yarnConfig.maxAttempt.match(re)
    }
    inputValueCheck(yarnConfig) {
        return yarnConfig.command.length > 0 &&
            yarnConfig.memory >= 32 &&
            yarnConfig.vcore > 0 &&
            yarnConfig.maxAttempt > 0
    }
    onTextInput = (e) => {
        const stateCopy = this.state;
        stateCopy.yarnConfig[e.target.name] =
            (typeof e.target.value === 'number') ?
                e.target.value.toString() : e.target.value;

        this.setState(stateCopy)
    };

    render() {
        return (
            <Container style={{marginTop: '3em', marginBottom:'3em'}}>
                <h3 align="center"> Submit your app </h3>
                <Form>
                    <Form.TextArea label='Command'
                                value={this.state.yarnConfig.command}
                                onChange={this.onTextInput}
                                name="command"/>
                    <Form.Group widths='equal'>
                            <Form.Input fluid label='Memory Requirement(MB)'
                                        value={this.state.yarnConfig.memory}
                                        onChange={this.onTextInput}
                                        name="memory"/>
                            <Form.Input fluid label='Virtual Core'
                                        value={this.state.yarnConfig.vcore}
                                        onChange={this.onTextInput}
                                        name="vcore"/>
                            <Form.Input fluid label='Max Attempt'
                                        value={this.state.yarnConfig.maxAttempt}
                                        onChange={this.onTextInput}
                                        name="maxAttempt">
                            </Form.Input>
                    </Form.Group>
                </Form>
                <Container textAlign="right">
                    <Button  className='float-right' onClick={this.create}> submit </Button>
                </Container>
            </Container>
        );
    }
}

export default RegisterApp