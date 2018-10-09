import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";

class MetricSummary extends Component {
    render() {
        return (
            <Container style={{ marginTop: "1em" }}>
                <h4> Metric Summary </h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>  Metric </Table.HeaderCell>
                            <Table.HeaderCell> Min </Table.HeaderCell>
                            <Table.HeaderCell> 25th percentile </Table.HeaderCell>
                            <Table.HeaderCell> Median </Table.HeaderCell>
                            <Table.HeaderCell> 75th percentile </Table.HeaderCell>
                            <Table.HeaderCell> Max </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell> Duration </Table.Cell>
                            <Table.Cell> 58 ms </Table.Cell>
                            <Table.Cell> 71 ms </Table.Cell>
                            <Table.Cell> 75 ms </Table.Cell>
                            <Table.Cell> 0.2 s</Table.Cell>
                            <Table.Cell> 1 s</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Scheduler Delay </Table.Cell>
                            <Table.Cell> 7 ms </Table.Cell>
                            <Table.Cell> 9 ms </Table.Cell>
                            <Table.Cell> 10 ms</Table.Cell>
                            <Table.Cell> 26 ms</Table.Cell>
                            <Table.Cell> 30 ms </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Task Deserialization Time </Table.Cell>
                            <Table.Cell> 3 ms </Table.Cell>
                            <Table.Cell> 4 ms</Table.Cell>
                            <Table.Cell> 16 ms</Table.Cell>
                            <Table.Cell> 48 ms</Table.Cell>
                            <Table.Cell> 0.4 s</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> GC Time </Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Result Serialization Time </Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Getting Result Time </Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Peak Execution Memory </Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Shuffle Read Blocked Time </Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms </Table.Cell>
                            <Table.Cell> 0 ms </Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                            <Table.Cell> 0 ms</Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Shuffle Read Size / Records </Table.Cell>
                            <Table.Cell> 0.0 B / 0 </Table.Cell>
                            <Table.Cell> 65.0 B / 1 </Table.Cell>
                            <Table.Cell> 65.0 B / 1 </Table.Cell>
                            <Table.Cell> 65.0 B / 1 </Table.Cell>
                            <Table.Cell> 65.0 B / 1 </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> Shuffle Remote Reads </Table.Cell>
                            <Table.Cell> 0.0 B </Table.Cell>
                            <Table.Cell> 0.0 B</Table.Cell>
                            <Table.Cell> 0.0 B</Table.Cell>
                            <Table.Cell> 0.0 B</Table.Cell>
                            <Table.Cell> 0.0 B</Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default MetricSummary