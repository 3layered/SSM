import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";

class TaskMetrics extends Component {
    render() {
        return (
            <Container style={{ marginTop: "1em" }}>
                <h4> Task Metrics </h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Index </Table.HeaderCell>
                            <Table.HeaderCell> ID </Table.HeaderCell>
                            <Table.HeaderCell> Attempt </Table.HeaderCell>
                            <Table.HeaderCell> Status </Table.HeaderCell>
                            <Table.HeaderCell> Locality Level </Table.HeaderCell>
                            <Table.HeaderCell> Executor ID </Table.HeaderCell>
                            <Table.HeaderCell> Host </Table.HeaderCell>
                            <Table.HeaderCell> Launch Time </Table.HeaderCell>
                            <Table.HeaderCell> Duration </Table.HeaderCell>
                            <Table.HeaderCell> Scheduler Delay </Table.HeaderCell>
                            <Table.HeaderCell> Task Deserialization Time </Table.HeaderCell>
                            <Table.HeaderCell> GC Time </Table.HeaderCell>
                            <Table.HeaderCell> Result Serialization Time </Table.HeaderCell>
                            <Table.HeaderCell> Getting Result Time </Table.HeaderCell>
                            <Table.HeaderCell> Peak Execution Memory</Table.HeaderCell>
                            <Table.HeaderCell> Shuffle Read Blocked Time </Table.HeaderCell>
                            <Table.HeaderCell> Shuffle Read Size / Records</Table.HeaderCell>
                            <Table.HeaderCell> Shuffle Remote Reads</Table.HeaderCell>
                            <Table.HeaderCell> Errors</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell> 0</Table.Cell>
                            <Table.Cell> 1</Table.Cell>
                            <Table.Cell> 0</Table.Cell>
                            <Table.Cell> SUCCESS</Table.Cell>
                            <Table.Cell> NODE_LOCAL</Table.Cell>
                            <Table.Cell> 1 </Table.Cell>
                            <Table.Cell> ip-172-31-39-199.us-west-2.compute.internal </Table.Cell>
                            <Table.Cell> 2018/10/09 09:13:03</Table.Cell>
                            <Table.Cell> 0.3 s</Table.Cell>
                            <Table.Cell> 26 ms</Table.Cell>
                            <Table.Cell> 48 ms</Table.Cell>
                            <Table.Cell> 8 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0.0 B</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 65.0 B / 1</Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                            <Table.Cell> </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> 1</Table.Cell>
                            <Table.Cell> 3</Table.Cell>
                            <Table.Cell> 0</Table.Cell>
                            <Table.Cell> SUCCESS</Table.Cell>
                            <Table.Cell> PROCESS_LOCAL</Table.Cell>
                            <Table.Cell> 2 </Table.Cell>
                            <Table.Cell> ip-172-31-43-218.us-west-2.compute.internal </Table.Cell>
                            <Table.Cell> 2018/10/09 09:13:03</Table.Cell>
                            <Table.Cell> 2 s</Table.Cell>
                            <Table.Cell> 30 ms</Table.Cell>
                            <Table.Cell> 0.4 s</Table.Cell>
                            <Table.Cell> 40 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0.0 B</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0.0 B / 1</Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                            <Table.Cell> </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default TaskMetrics;