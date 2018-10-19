import React, { Component } from "react";
import { Button, Segment, Input, Form, Divider, Container } from "semantic-ui-react";
import {
	RegisterApp,
	AppList
} from "../components/register";

class Register extends Component {
	constructor() {
		super();

		this.state = {
			proxyUrl: 'https://cors-anywhere.herokuapp.com/',
			yarnServerUrl: 'http://175.197.78.31:8088/',
			yarnApiPrefix: 'http://175.197.78.31:8088/ws/v1/',
            urlPrefix: 'https://cors-anywhere.herokuapp.com/http://175.197.78.31:8088/ws/v1/'
		};
	}
	render() {
		return (
			<Container style={{ marginTop: "1em" }}>
				<h4 align="center">
					Yarn RM Server Address
					<div style={{color: 'red'}}> {this.state.yarnServerUrl} </div>
				</h4>
				<Divider/>
				<RegisterApp urlPrefix={this.state.urlPrefix}/>
				<Divider/>
				<AppList urlPrefix={this.state.urlPrefix}/>
			</Container>
		);
	}
}

export default Register;
