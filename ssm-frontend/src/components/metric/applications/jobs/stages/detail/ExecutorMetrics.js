import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";

class ExecutorMetrics extends Component {
    render() {
        return (
            <Container style={{ marginTop: "1em" }}>
                <h4> Aggregated Metrics by Executor </h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> Executor ID </Table.HeaderCell>
                            <Table.HeaderCell> Address </Table.HeaderCell>
                            <Table.HeaderCell> Task Time </Table.HeaderCell>
                            <Table.HeaderCell> Total Tasks </Table.HeaderCell>
                            <Table.HeaderCell> Failed Tasks </Table.HeaderCell>
                            <Table.HeaderCell> Killed Tasks </Table.HeaderCell>
                            <Table.HeaderCell> Succeeded Tasks </Table.HeaderCell>
                            <Table.HeaderCell> Shuffle Read Size </Table.HeaderCell>
                            <Table.HeaderCell> Blacklisted </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell> 1 </Table.Cell>
                            <Table.Cell> ip-172-31-39-199.us.west-2.compute.internal:33349 </Table.Cell>
                            <Table.Cell> 1.0 s</Table.Cell>
                            <Table.Cell> 7 </Table.Cell>
                            <Table.Cell> 0 </Table.Cell>
                            <Table.Cell> 0 </Table.Cell>
                            <Table.Cell> 7 </Table.Cell>
                            <Table.Cell> 455.0 B / 7 </Table.Cell>
                            <Table.Cell> false </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell> 2 </Table.Cell>
                            <Table.Cell> ip-172-31-43-218.us.west-2.compute.internal:333925 </Table.Cell>
                            <Table.Cell> 2 s </Table.Cell>
                            <Table.Cell> 1 </Table.Cell>
                            <Table.Cell> 0 </Table.Cell>
                            <Table.Cell> 0 </Table.Cell>
                            <Table.Cell> 7 </Table.Cell>
                            <Table.Cell> 0.0 B / 0</Table.Cell>
                            <Table.Cell> false </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default ExecutorMetrics