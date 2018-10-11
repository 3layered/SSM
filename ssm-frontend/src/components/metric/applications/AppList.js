import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

class AppList extends Component {
    render() {
        return (
            <Container style={{marginTop: "1em"}}>
                <h4> Application List </h4>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell> App ID </Table.HeaderCell>
                            <Table.HeaderCell> App Name </Table.HeaderCell>
                            <Table.HeaderCell> Started </Table.HeaderCell>
                            <Table.HeaderCell> Completed </Table.HeaderCell>
                            <Table.HeaderCell> Duration </Table.HeaderCell>
                            <Table.HeaderCell> Spark User </Table.HeaderCell>
                            <Table.HeaderCell> Last Updated </Table.HeaderCell>
                            <Table.HeaderCell> Event Log </Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>
                                <Link to="/metric/applications/jobs">application_1539076079339_0002</Link>
                            </Table.Cell>
                            <Table.Cell> MySparkApp </Table.Cell>
                            <Table.Cell> 2018-10-09 18:12:28 </Table.Cell>
                            <Table.Cell> 2018-10-09 18:14:18 </Table.Cell>
                            <Table.Cell> 1.8 min </Table.Cell>
                            <Table.Cell> hadoop </Table.Cell>
                            <Table.Cell> 2018-10-09 18:14:19</Table.Cell>
                            <Table.Cell> download </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>
                                <Link to="/metric/applications/jobs">application_1539076079339_0001 </Link>
                            </Table.Cell>
                            <Table.Cell> YourSparkApp </Table.Cell>
                            <Table.Cell> 2018-10-08 10:17:08 </Table.Cell>
                            <Table.Cell> 2018-10-08 11:20:49 </Table.Cell>
                            <Table.Cell> 1 hour 3 min </Table.Cell>
                            <Table.Cell> hadoop </Table.Cell>
                            <Table.Cell> 2018-10-08 11:21:00</Table.Cell>
                            <Table.Cell> download </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            </Container>
        );
    }
}

export default AppList