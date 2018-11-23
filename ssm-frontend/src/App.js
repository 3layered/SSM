import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import {
	Home,
	Apps,
	FoP,
	Metric,
	Nodes,
	Register,
	Login,
	NoMatch,
	AppDetail,
	AttemptDetail,
	Streaming,
	Directory
} from "./pages";
import Header from "./Header";

import { AppList, JobList, StageList, StageMetric } from "./components/metric";
import { connect } from 'react-redux';
import { doUpdateAppList } from "./actions";
import axios from "axios";

class App extends Component {
    constructor(props) {
        super(props);
        this.pollAppList();
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    async pollAppList() {
        const server_url = 'http://localhost:8088';
        const backend_url = 'http://localhost:8000/api/v1/applications/';
        const header = {'Content-Type': 'application/json'};
        while (true) {
            axios.post(backend_url, {"url": server_url}, header)
                .then(response => {
                        if (response.data['apps']) {
                            const appList = response.data['apps']['app'];
                            this.props.updateAppList(appList);
                        }
                    }
                )
                .catch(error => {
                    if (!error.response) {

                    } else if(error.response.status === 404) {

                    }
                });
            await this.sleep(3000)
        }
    }
	render() {
		return (
			<div>
				<Header />
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/apps" component={Apps} />
					<Route exact path="/apps/detail" component={AppDetail} />
					<Route exact path="/apps/detail/attempt" component={AttemptDetail} />
					<Route exact path="/fop" component={FoP} />
					<Route exact path="/metric" component={AppList} />
					<Route exact path="/metric/applications" component={AppList} />
					<Route exact path="/metric/applications/jobs" component={JobList} />
					<Route
						exact
						path="/metric/applications/jobs/stages"
						component={StageList}
					/>
					<Route
						path="/metric/applications/jobs/stages/detail"
						component={StageMetric}
					/>
					<Route exact path="/nodes" component={Nodes} />
					<Route exact path="/register" component={Register} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/streaming" component={Streaming} />
					<Route exact path="/directory" component={Directory} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		);
	}
}

let mapStateToProps = (state) => {
    return {
        appList: state.appListReducer.appList
    };
};

let mapDispatchToProps = (dispatch) => {
    return {
        updateAppList: (appList) => dispatch(doUpdateAppList(appList)),
    }
};

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
