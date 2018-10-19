import React, { Component } from "react";
import {
	LineChart,
	Line,
	CartesianGrid,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer
} from "recharts";
import Moment from "react-moment";
import "moment-timezone";

class BatchTable extends Component {
	render() {
		const { data, x, y } = this.props;
		return (
			// <ResponsiveContainer width="80%" height="80%">
			<LineChart
				width={600}
				height={150}
				data={data}
				margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
			>
				<Line
					type="monotone"
					dataKey={y}
					stroke="#8884d8"
					isAnimationActive={false}
				/>
				<CartesianGrid stroke="#eee" strokeDasharray="5 5" />
				<XAxis dataKey={x} />
				<YAxis dataKey={y} />
				<Tooltip isAnimationActive={true} />
			</LineChart>
			// </ResponsiveContainer>
		);
	}
}

export default BatchTable;
