import React, { Component } from "react";
import { Button, Segment, Input, Form, Divider, Container } from "semantic-ui-react";
import connect from "react-redux/es/connect/connect";
import axios from "axios";

class RegisterFailoverPlan extends Component {
    constructor(props) {
        super(props);
    }
    addDependency() {
        let appList = this.props.appList.filter(app => app.state !== 'FAILED' &&
            app.state !== 'KILLED');

        const url = 'http://localhost:8000/api/v1/applications/dependency/';
        const header = {'Content-Type': 'application/json'};
        let parent_id = appList[0]['id'];
        let child_app_id = appList[1]['id'];
        axios.post(url, {'parent_app_id': parent_id, 'child_app_id': child_app_id}, header);

    }
    deleteDependency() {

    }
    changeFailoverPolicy() {

    }
    render() {
        return (
            <Container>
                Register Failover Plan
                <Button onClick={() => this.addDependency()}> Register </Button>
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

RegisterFailoverPlan = connect(mapStateToProps, null)(RegisterFailoverPlan);

export default RegisterFailoverPlan