import React, { Component } from "react";
import { Button, Segment, Input, Form, Divider, Container } from "semantic-ui-react";
import {
	RegisterApp,
	AppList
} from "../components/register";

class Register extends Component {
	constructor() {
		super();
	}
	render() {
		return (
			<Container style={{ marginTop: "1em" }}>
				<Divider/>
				<RegisterApp/>
				<Divider/>
				<AppList/>
			</Container>
		);
	}
}

export default Register;
