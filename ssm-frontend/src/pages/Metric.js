import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import { Switch, Route } from "react-router-dom";
import {
	AppList,
	JobList,
	StageList,
	EventTimeline,
	MetricSummary,
	ExecutorMetrics,
	TaskMetrics
} from "../components/metric";

class Metric extends Component
{
	render() {
		return (
            <Container style={{ marginTop: "3em" }}>
                Metric Page

            </Container>
		);

	}
}

export default Metric;
