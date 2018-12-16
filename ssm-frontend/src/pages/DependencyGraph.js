import React, { Component } from "react";
import { Card, Container } from "semantic-ui-react";
import axios from "axios";

import { Graph } from "react-d3-graph";

class DependencyGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				nodes: [{ id: "Harry" }, { id: "Sally" }, { id: "Alice" }],
				links: [
					{ source: "Harry", target: "Sally" },
					{ source: "Harry", target: "Alice" },
					{ source: "Sally", target: "Alice" }
				]
			}
		};
		axios
			.get("http://localhost:8000/api/v1/applications/dependency/")
			.then(response => {
				console.log(response.data);
				this.setState({ data: response.data });
			})
			.catch(error => {
				alert("response error");
			});
	}
	onClickNode = nodeId => {
		this.setState({ focusedNodeId: nodeId });
	};
	onClickLink = (source, target) => {
		window.alert(`Clicked link between ${source} and ${target}`);
	};
	myConfig = {
		directed: true,
		nodeHighlightBehavior: true,
		highlightDegree: 2,
		highlightOpacity: 0.2,
		focusZoom: 2,
		// node: {
		// 	color: "lightgreen",
		// 	size: 1000,
		// 	highlightStrokeColor: "blue",
		// 	viewGenerator: node => (
		// 		<Card>
		// 			<Card.Content>
		// 				<Card.Header>{node.id}</Card.Header>
		// 				<Card.Meta>Co-Worker</Card.Meta>
		// 				<Card.Description>
		// 					Matthew is a pianist living in Nashville.
		// 				</Card.Description>
		// 			</Card.Content>
		// 		</Card>
		// 	),
		// 	renderLabel: false
		// },
		link: {
			highlightColor: "lightblue",
			strokeWidth: 4
		},
		d3: {
			alphaTarget: 0.05,
			gravity: -250,
			linkLength: 300,
			linkStrength: 2
		},
		height: 600,
		width: 1100
	};
	render() {
		const data = {
			...this.state.data,
			focusedNodeId: this.state.focusedNodeId
		};
		return (
			<Container
				style={{
					marginTop: "3em",
					marginBottom: "3em",
					border: "1px solid black"
				}}
			>
				<Graph
					id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
					data={this.state.data}
					config={this.myConfig}
					onClickNode={this.onClickNode}
					onClickLink={this.onClickLink}
				/>
			</Container>
		);
	}
}

export default DependencyGraph;
