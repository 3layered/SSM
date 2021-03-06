import React, { Component } from "react";
import { Button, Form, Container, Message } from "semantic-ui-react";
import axios from "axios";
import { DirectoryList } from "../directory";

class RegisterApp extends Component {
	constructor(props) {
		super(props);

		this.state = {
			errorMessages: [],
			yarnConfig: {
				server_url: "localhost:8088",
				emr: false,
				command: "",
				filePaths: [],
				file: "/",
				memory: "512",
				core: "1",
				home: "/",
				spark_home: "/"
			}
		};

		this.submit = this.submit.bind(this);

		this.onTextInput = this.onTextInput.bind(this);
		this.addFile = this.addFile.bind(this);
		this.onClickCheckbox = this.onClickCheckbox.bind(this);
	}
	submit(config) {
		let errorMessages = [];
		if (config.server_url === "") {
			errorMessages.push("Enter server url");
		}
		if (config.filePaths.length === 0) {
			errorMessages.push("Enter file path of your app");
		}
		if (config.memory === "") {
			errorMessages.push("Enter memory requirement");
		}
		if (config.core === "") {
			errorMessages.push("Enter #core requirement");
		}
		if (errorMessages.length > 0) {
			this.submitNotSuccessful(errorMessages);
			return;
		}

		const backend_url = "http://localhost:8000/api/v1/applications/submit/";
		const header = { "Content-Type": "application/json" };

		const data = this.buildData(config);

		axios
			.post(backend_url, data, header)
			.then(response => {
				if (response.data !== "") {
					errorMessages = response.data["err_msg"];
					this.submitNotSuccessful(errorMessages);
				} else this.submitSuccessful();
			})
			.catch(error => console.log(error.message));

		this.emptyFilePaths();
	}
	submitSuccessful() {
		this.setErrorMessages([]);
		this.emptyFilePaths();
	}
	submitNotSuccessful(errorMessage) {
		this.setErrorMessages(errorMessage);
	}
	setErrorMessages(messages) {
		const stateCopy = this.state;
		stateCopy.errorMessages = messages;
		this.setState(stateCopy);
	}
	buildData(config) {
		let url,
			command,
			argumentFilePaths,
			hdfsResources,
			environment,
			home,
			spark_home;

		url = config.server_url;

		argumentFilePaths = "";
		hdfsResources = [];
		for (let i = 0; i < config.filePaths.length; i++) {
			let path = config.filePaths[i];
			let trimmedPath = path.trim();
			if (trimmedPath.substring(0, 7) === "hdfs://") {
				let splitPath = trimmedPath.split(" ");
				let key = "HDFS_" + i;
				let hdfsPath = splitPath[0];
				let size = splitPath[1];
				let timestamp = splitPath[2];
				hdfsResources.push({
					key: key,
					value: {
						resource: hdfsPath,
						type: "FILE",
						visibility: "APPLICATION",
						size: size,
						timestamp: timestamp
					}
				});
				argumentFilePaths += key + " ";
			} else {
				argumentFilePaths += trimmedPath + " ";
			}
		}

		command =
			"{{SPARK_HOME}}/bin/spark-submit " +
			"--master yarn " +
			"--executor-memory " +
			config.memory +
			"M " +
			"--executor-cores " +
			config.core +
			" " +
			argumentFilePaths;

		if (config.emr) {
			if (config.home === "") home = "/home/hadoop";
			if (config.spark_home === "") spark_home = "/usr/lib/spark";
		} else {
			home = config.home;
			spark_home = config.spark_home;
		}

		environment = {
			entry: [
				{ key: "SPARK_HOME", value: spark_home },
				{ key: "HOME", value: home }
			]
		};

		let httpBody = {
			"application-id": "", // this field will be filled in backend
			"application-name": "SUBMIT",
			"am-container-spec": {
				commands: { command: command },
				environment: environment
			},
			"unmanaged-AM": "false",
			"max-app-attempts": "1",
			resource: { memory: 128, vCores: 1 },
			"application-type": "SUBMIT",
			"keep-containers-across-application-attempts": "false"
		};

		if (hdfsResources.length > 0) {
			httpBody["am-container-spec"]["local-resources"] = {
				entry: hdfsResources
			};
		}

		return {
			url: url,
			body: httpBody,
			memory: config.memory,
			cores: config.core
		};
	}
	onTextInput = e => {
		const stateCopy = this.state;
		stateCopy.yarnConfig[e.target.name] =
			typeof e.target.value === "number"
				? e.target.value.toString()
				: e.target.value;

		this.setState(stateCopy);
	};
	addFile() {
		const stateCopy = this.state;

		stateCopy.yarnConfig.filePaths = [
			...stateCopy.yarnConfig.filePaths,
			stateCopy.yarnConfig.file
		];
		// stateCopy.yarnConfig.file = "";
		this.setState(stateCopy);
	}
	emptyFilePaths() {
		const stateCopy = this.state;
		stateCopy.yarnConfig.filePaths = [];
		this.setState(stateCopy);
	}
	onClickCheckbox() {
		const stateCopy = this.state;
		stateCopy.yarnConfig.emr = !stateCopy.yarnConfig.emr;
		this.setState(stateCopy);
	}
	setFile = fileName => {
		const stateCopy = { ...this.state };
		stateCopy.yarnConfig.filePaths = [
			...stateCopy.yarnConfig.filePaths,
			"hdfs://localhost:9000" + fileName
		];
		this.setState(stateCopy);
	};
	reset = () => {
		const s = this.state;
		this.setState({
			...s,
			yarnConfig: { ...s.yarnConfig, filePaths: [], file: "/" }
		});
	};
	handleselectedFile = event => {
		console.log(event.target.files[0]);
		this.setState({
			yarnConfig: { ...this.state.yarnConfig, file: event.target.files[0].name }
		});
	};
	render() {
		return (
			<Container style={{ marginTop: "3em", marginBottom: "3em" }}>
				<h3 align="center"> Submit your app </h3>
				<h4 align="center" style={{ color: "red" }}>
					{this.state.errorMessages.map((msg, i) => {
						return <div>{msg}</div>;
					})}
				</h4>
				<Form>
					{/* <label>I am using Amazon EMR server</label>
					<input
						type="checkbox"
						value={this.state.yarnConfig.emr}
						onClick={this.onClickCheckbox}
					/> */}

					{/* <input type="file" name="" id="" onChange={this.handleselectedFile} /> */}
					<b>HDFS</b>
					<div style={{ border: "black solid 1px" }}>
						<DirectoryList setFile={this.setFile} url="localhost:50070" />
					</div>
					{this.state.yarnConfig.filePaths.length !== 0 ? (
						<Message>
							<Message.Header>Argument Build</Message.Header>
							{this.state.yarnConfig.filePaths.map((path, i) => {
								return i === 0 ? (
									<div>App: {path}</div>
								) : (
									<div>
										Argument {i}: {path}
									</div>
								);
							})}
						</Message>
					) : null}

					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Server URL"
							value={this.state.yarnConfig.server_url}
							onChange={this.onTextInput}
							name="server_url"
						/>

						<Form.Input
							fluid
							label="Argument"
							value={this.state.yarnConfig.file}
							onChange={this.onTextInput}
							name="file"
						/>
					</Form.Group>
					{/* <div style={{ textAlign: "right" }}>
						<Form.Button content="Argument Submit" />
					</div> */}
					<div style={{ textAlign: "right" }}>
						{" "}
						<Button onClick={() => this.addFile()}>Add Argument</Button>
						<Button onClick={() => this.reset()}>Reset</Button>
					</div>

					<Form.Group widths="equal">
						<Form.Input
							label="Home dir"
							value={this.state.yarnConfig.home}
							onChange={this.onTextInput}
							name="home"
						/>

						<Form.Input
							label="Spark home dir"
							value={this.state.yarnConfig.spark_home}
							onChange={this.onTextInput}
							name="spark_home"
						/>
					</Form.Group>
					<Form.Group widths="equal">
						<Form.Input
							fluid
							label="Memory Requirement(MB)"
							value={this.state.yarnConfig.memory}
							onChange={this.onTextInput}
							name="memory"
						/>
						<Form.Input
							fluid
							label="Number of Cores"
							value={this.state.yarnConfig.core}
							onChange={this.onTextInput}
							name="core"
						/>
					</Form.Group>
				</Form>
				<Container textAlign="right">
					<Button
						className="float-right"
						onClick={() => this.submit(this.state.yarnConfig)}
					>
						Submit
					</Button>
				</Container>
			</Container>
		);
	}
}

export default RegisterApp;
