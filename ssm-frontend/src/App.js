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
	Directory,
	DependencyGraph,
	Environment,
	Executors,
	Stages
} from "./pages";
import Header from "./Header";

import { AppList, JobList, StageList, StageMetric } from "./components/metric";

class App extends Component {
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
					<Route exact path="/dg" component={DependencyGraph} />
					<Route exact path="/environment" component={Environment} />
					<Route exact path="/executors" component={Executors} />
					<Route exact path="/stages" component={Stages} />
					<Route component={NoMatch} />
				</Switch>
			</div>
		);
	}
}

export default App;
