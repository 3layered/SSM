import React, { Component } from "react";
import { Container, Divider } from "semantic-ui-react";
import {
	RegisterFailoverPlan,
	DependencyList
} from "../components/failover";

class FoP extends Component {
	render() {
		return (
			<Container style={{ marginTop: "10em" }}>
				FoP Page
				<Divider/>
				<DependencyList/>
				<Divider/>
				<RegisterFailoverPlan/>
			</Container>
		);
	}
}

export default FoP;
