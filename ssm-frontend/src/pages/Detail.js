import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import Environment from "./Environment";
import Executors from "./Executors";
import Stages from "./Stages";
import { AppsList } from "../components/apps";

class Detail extends Component {
	render() {
		return (
			<Container style={{ marginTop: "3em", marginBottom: "3em" }}>
				<AppsList />
				<Executors />
				<Stages />
				<Environment />
			</Container>
		);
	}
}

export default Detail;
