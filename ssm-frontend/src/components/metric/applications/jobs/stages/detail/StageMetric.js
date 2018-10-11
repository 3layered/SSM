import React, { Component } from "react";
import { Container } from "semantic-ui-react";

import {
    EventTimeline,
    MetricSummary,
    ExecutorMetrics,
    TaskMetrics
} from "../../../../";

class StageMetric extends Component
{
    render() {
        return (
            <Container>
                <EventTimeline />
                <MetricSummary/>
                <ExecutorMetrics />
                <TaskMetrics/>
            </Container>
        );

    }
}

export default StageMetric;
