import React, { Component } from "react";
import {
	Button,
	List,
	Checkbox,
	Segment,
	Input,
	Form,
	Divider,
	Container
} from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import Graph from "react-graph-vis";
import axios from "axios";

class DependencyList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			from: null,
			to: null,
			edge: null,
			/*
			selectFrom: false,
			selectTo: false
			*/
			nodeDetail: null
		};
		this.handleSelect = this.handleSelect.bind(this);
	}
	handleSelect(event) {
		/*
        const url = 'http://localhost:8000/api/v1/applications/dependency/';
        axios.get(url)
            .then(r => console.log(JSON.stringify(r)));
            */
		/*
		if (event.nodes) {
			if (this.state.selectFrom) {
				this.setState({ from: event.nodes[0], selectFrom: false });
			} else if (this.state.selectTo) {
				this.setState({ to: event.nodes[0], selectTo: false });
			}
		}
		*/
        if (event.nodes) {
            this.setState({nodeDetail: event.nodes[0]})
        }
	}
	renderApp(app) {
		return (
			<Container>
				<List>
					<List.Item>{"  "} Application id: {" " + app.id}</List.Item>
					<List.Item>{"  "} Application name: {" " + app.name}</List.Item>
				</List>
				<div>
					<Button onClick={()=>this.setState({from: app.id})}>
						Set as parent </Button>
					<Button onClick={()=>this.setState({to: app.id})}>
						Set as child </Button>
				</div>
                <div>
					{"  "} Failover Policy
                    <div>
                        {"  "} {"  "} <Checkbox
                            label="IGNORE"
                            checked={this.state.edge === 0}
                            onClick={() => this.handleClickCheckbox(0)}
                        />
                    </div>
                    <div>
                        {"  "} {"  "} <Checkbox
                            label="CASCADE"
                            checked={this.state.edge === 1}
                            onClick={() => this.handleClickCheckbox(1)}
                        />
                    </div>
                    <div>
                        {"  "} {"  "} <Checkbox
                            label="RETRY"
                            checked={this.state.edge === 2}
                            onClick={() => this.handleClickCheckbox(2)}
                        />
                    </div>
                </div>
				<div>
                    <Button onClick={() => this.addDependency()}> Register </Button>
                    <Button onClick={() => this.deleteDependency()}>
                        {" "}
                        Delete Dependency{" "}
                    </Button>
				</div>
			</Container>
		)
	}
	renderNodeDetail(appId) {
		if (appId) {
            let app = this.props.appList.find(app => app.id === appId);
            return this.renderApp(app)
		} else {
			return (<Container> {} </Container>)
		}

	}
	edge2fop(edge) {
		if (edge === 0) {
			return 'ignore'
		} else if (edge === 1) {
			return 'cascade'
		} else if (edge === 2) {
			return 'retry'
		} else {
			return null
		}
	}
	addDependency() {
		const stateCopy = this.state;
		const header = { "Content-Type": "application/json" };
		const parent_app_id = stateCopy.from;
		const child_app_id = stateCopy.to;
		const url =
			"http://localhost:8000/api/v1/applications/dependency/" +
			parent_app_id +
			"/" +
			child_app_id +
			"/";
		const failover_plan = this.edge2fop(stateCopy.edge)
		const body = { failover_plan: failover_plan };
		axios.post(url, body, header);
		this.setState({from: null, to: null, edge: null})
	}
	deleteDependency() {
		const stateCopy = this.state;
		const parent_app_id = stateCopy.from;
		const child_app_id = stateCopy.to;
		const url =
			"http://localhost:8000/api/v1/applications/dependency/" +
			parent_app_id +
			"/" +
			child_app_id +
			"/";
		axios.delete(url);
	}
	renderDependency(appList, dependencyList) {
		appList = appList.filter(
			app =>
				app.state !== "FAILED" &&
				app.state !== "KILLED" &&
				app.state !== "FINISHED"
		);

		const graph = {
			nodes: appList.map(app => {
				return {
					id: app.id,
					label: app.name + "\n(" + app.id + ")",
					physics: false
				};
			}),
			edges: dependencyList.map(dependency => {
				return {
					from: dependency["parent_id"],
					to: dependency["child_id"],
					label: dependency["failover_plan"]
				};
			})
		};
		const options = {
			layout: {
				hierarchical: false
			},
			nodes: {
				shape: "box"
			},
			edges: {
				color: "#000000",
				hoverWidth: 10
			},
			height: "400px",
			width: "600pxs"
		};

		const events = {
			state: this.state,
			handleSelect: this.handleSelect,
			select: function(event) {
				events.handleSelect(event);
			}
		};
		return <Graph graph={graph} options={options} events={events} />;
	}
	handleClickCheckbox(id) {
		this.setState({ edge: id });
	}
	newDependencyList(deppendencyList) {
		const stateCopy = this.state;
		let edgemsg = 'Select failover policy\n';
		const fop = this.edge2fop(this.state.edge);
		if (fop) {
			edgemsg += '(' + fop.toUpperCase() + ' selected)'
		}
		if (stateCopy.from && stateCopy.to) {
            return [{'parent_id': stateCopy.from,
                     'child_id': stateCopy.to,
            		 'failover_plan': edgemsg}].concat(deppendencyList);
		} else {
			return deppendencyList;
		}
	}
	render() {
		return (
			<Container>
				<Container>
					<h4>Dependency Graph</h4>
					{/* {JSON.stringify(this.state)} */}
					<div style={{ border: "solid black 1px" }}>
						{this.renderDependency(
							this.props.appList,
							this.newDependencyList(this.props.dependencyList)
						)}
					</div>
				</Container>
				<Divider />
				<Container>
					<h4> Application Detail </h4>
					<div> {this.renderNodeDetail(this.state.nodeDetail)} </div>
				</Container>
				<Container>
					{/*Dependency
					<div>
						Parent:
						{this.state.selectFrom ? (
							<span> Selecting </span>
						) : this.state.from ? (
							<span>
								{" "}
								{this.state.from}{" "}
								<Button onClick={() => this.setState({ selectFrom: true })}>
									{" "}
									Reselect{" "}
								</Button>{" "}
							</span>
						) : (
							<Button onClick={() => this.setState({ selectFrom: true })}>
								{" "}
								Select{" "}
							</Button>
						)}
					</div>

					<div>
						Child:
						{this.state.selectTo ? (
							<span> Selecting </span>
						) : this.state.to ? (
							<span>
								{" "}
								{this.state.to}{" "}
								<Button onClick={() => this.setState({ selectTo: true })}>
									{" "}
									Reselect{" "}
								</Button>{" "}
							</span>
						) : (
							<Button onClick={() => this.setState({ selectTo: true })}>
								{" "}
								Select{" "}
							</Button>
						)}
					</div>
					*/}
				</Container>
			</Container>
		);
	}
}

let mapStateToProps = state => {
	return {
		appList: state.appListReducer.appList,
		dependencyList: state.appListReducer.dependencyList
	};
};

DependencyList = connect(
	mapStateToProps,
	null
)(DependencyList);

export default DependencyList;
