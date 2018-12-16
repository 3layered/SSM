import React, { Component } from "react";
import { Card } from "semantic-ui-react";
import axios from "axios";

import { Graph } from "react-d3-graph";

class DependencyGraph extends Component {
	constructor(props) {
		super(props);
		this.state = {
			focusedNodeId: "Harry"
		};
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
		node: {
			color: "lightgreen",
			size: 1000,
			highlightStrokeColor: "blue",
			viewGenerator: node => (
				<Card>
					<Card.Content>
						<Card.Header>{node.id}</Card.Header>
						<Card.Meta>Co-Worker</Card.Meta>
						<Card.Description>
							Matthew is a pianist living in Nashville.
						</Card.Description>
					</Card.Content>
				</Card>
			),
			renderLabel: false
		},
		link: {
			highlightColor: "lightblue",
			strokeWidth: 4
		},
		d3: {
			alphaTarget: 0.05,
			gravity: -250,
			linkLength: 500,
			linkStrength: 2
		}
	};
	render() {
		const data = {
			nodes: [
				{ id: "Harry" },
				{ id: "Sally" },
				{ id: "Alice" },
				{ id: "No friend" }
			],
			links: [
				{ source: "Harry", target: "Sally" },
				{ source: "Harry", target: "Alice" },
				{ source: "Sally", target: "Alice" }
			],
			focusedNodeId: this.state.focusedNodeId
		};
		return (
			<Graph
				id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
				data={data}
				config={this.myConfig}
				onClickNode={this.onClickNode}
				onClickLink={this.onClickLink}
			/>
		);
	}
}

export default DependencyGraph;
