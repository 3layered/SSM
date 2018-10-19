import React, { Component } from "react";
import { Container, Table } from "semantic-ui-react";
import { Link } from "react-router-dom";

class BatchTable extends Component {
	render() {
		const batches = this.props.batches;
		return (
			<Container style={{ marginTop: "1em" }}>
				<Table celled>
					<Table.Header>
						<Table.Row>
							<Table.HeaderCell> Batch Time </Table.HeaderCell>
							<Table.HeaderCell> Records </Table.HeaderCell>
							<Table.HeaderCell> Scheduling Delay </Table.HeaderCell>
							<Table.HeaderCell> Processing Time </Table.HeaderCell>
							<Table.HeaderCell> Total Delay </Table.HeaderCell>
							<Table.HeaderCell> Output Ops : Succeded/Total </Table.HeaderCell>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{batches
							? batches.map((batch, index) => (
									<Table.Row key={index}>
										<Table.Cell>{batch.batchTime}</Table.Cell>
										<Table.Cell>{batch.inputSize} records</Table.Cell>
										<Table.Cell>{batch.schedulingDelay} ms</Table.Cell>
										<Table.Cell>{batch.processingTime} ms</Table.Cell>
										<Table.Cell>{batch.totalDelay} ms</Table.Cell>
										<Table.Cell>
											{batch.numCompletedOutputOps}/{batch.numTotalOutputOps}
										</Table.Cell>
									</Table.Row>
							  ))
							: null}
					</Table.Body>
				</Table>
			</Container>
		);
	}
}

export default BatchTable;
