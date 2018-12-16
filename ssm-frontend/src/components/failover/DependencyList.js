import React, { Component } from "react";
import { Button, Checkbox, Segment, Input, Form, Divider, Container } from "semantic-ui-react";
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
            selectFrom: false,
            selectTo: false
        };
        this.handleSelect = this.handleSelect.bind(this);
    }
    changeFailoverPolicy() {

    }

    handleSelect(event) {
        /*
        const url = 'http://localhost:8000/api/v1/applications/dependency/';
        axios.get(url)
            .then(r => console.log(JSON.stringify(r)));
            */
        if (event.nodes) {
            if (this.state.selectFrom) {
                this.setState({from: event.nodes[0], selectFrom: false})
            } else if (this.state.selectTo) {
                this.setState({to: event.nodes[0], selectTo: false})
            }
        }
    }
    addDependency() {
        const stateCopy = this.state;
        const header = {'Content-Type': 'application/json'};
        const parent_app_id = stateCopy.from;
        const child_app_id = stateCopy.to;
        const url = 'http://localhost:8000/api/v1/applications/dependency/' + parent_app_id + '/' + child_app_id + '/';
        const failover_plan =
            stateCopy.edge === 0 ? 'ignore' :
                stateCopy.edge === 1 ? 'cascade' : 'retry';
        const body = {'failover_plan': failover_plan};
        axios.post(url, body, header);
    }
    deleteDependency() {
        const stateCopy = this.state;
        const parent_app_id = stateCopy.from;
        const child_app_id = stateCopy.to;
        const url = 'http://localhost:8000/api/v1/applications/dependency/' + parent_app_id + '/' + child_app_id + '/';
        axios.delete(url)
    }
    renderDependency(appList, dependencyList) {

        appList = appList.filter(app => app.state !== 'FAILED' &&
                                        app.state !== 'KILLED' &&
                                        app.state !== 'FINISHED');

        const graph = {
            nodes: appList.map(app => {return {id: app.id, label: app.id.slice(-4), physics: false}}),
            edges: dependencyList.map(dependency => {return {from: dependency['parent_id'], to: dependency['child_id'], label: dependency['failover_plan']}})
        };
        const options = {
            layout: {
                hierarchical: false
            },
            nodes: {
                shape: 'box'
            },
            edges: {
                color: "#000000",
                hoverWidth: 10
            },
            height: '600px'
        };

        const events = {
            state: this.state,
            handleSelect: this.handleSelect,
            select: function(event) {
                events.handleSelect(event)
            }
        };
        return (<Graph graph={graph} options={options} events={events}/>);
    }
    handleClickCheckbox(id) {
        this.setState({edge: id})
    }
    render() {
        return (
            <Container>
                <Container>
                    Dependency List
                    {JSON.stringify(this.state)}
                    <div>
                        {this.renderDependency(this.props.appList, this.props.dependencyList)}
                    </div>
                </Container>
                <Divider/>
                <Container>
                    Dependency
                    <div>
                        Parent:
                        {this.state.selectFrom ? <span> Selecting </span> :
                            this.state.from ?
                            <span> {this.state.from} <Button onClick={() => this.setState({selectFrom: true})}> Reselect </Button> </span> :
                            <Button onClick={() => this.setState({selectFrom: true})}> Select </Button>}
                    </div>
                    <div>
                        Child:
                        {this.state.selectTo ? <span> Selecting </span> :
                            this.state.to ?
                            <span> {this.state.to} <Button onClick={() => this.setState({selectTo: true})}> Reselect </Button> </span> :
                            <Button onClick={() => this.setState({selectTo: true})}> Select </Button>}
                    </div>
                    <div>
                        Failover Policy
                        <div>
                            <Checkbox label='IGNORE'
                                      checked={this.state.edge === 0}
                                      onClick={() => this.handleClickCheckbox(0)}/>
                        </div>
                        <div>
                            <Checkbox label='CASCADE'
                                      checked={this.state.edge === 1}
                                      onClick={() => this.handleClickCheckbox(1)}/>
                        </div>
                        <div>
                            <Checkbox label='RETRY'
                                      checked={this.state.edge === 2}
                                      onClick={() => this.handleClickCheckbox(2)}/>
                        </div>
                    </div>
                    <Button onClick={() => this.addDependency()}> Register </Button>
                    <Button onClick={() => this.deleteDependency()}> Delete Dependency </Button>
                </Container>
            </Container>
        )
    }
}

let mapStateToProps = (state) => {
    return {
        appList: state.appListReducer.appList,
        dependencyList: state.appListReducer.dependencyList
    };
};

DependencyList = connect(mapStateToProps, null)(DependencyList);

export default DependencyList