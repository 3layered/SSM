import React, { Component } from "react";
import { Container, List, Button } from "semantic-ui-react";
import axios from "axios";

class DirectoryList extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		axios
			.post("http://localhost:8000/api/v1/directory/", {
				dir: "user"
			})
			.then(response => {
				this.setState({
					tree: [
						{ parent: "user", dirs: response.data.FileStatuses.FileStatus }
					]
				});
			})
			.catch(error => {
				alert("error");
				console.log(error);
				console.log(error.status);
				console.log(error.code);
			});
	}
	toggle_dir(path) {
		let exist = 0;
		for (var i = 0; i < this.state.tree.length; i++) {
			if (this.state.tree[i].parent.startsWith(path)) {
				const tmp = this.state.tree;
				tmp.splice(i, 1);
				this.setState({
					tree: tmp
				});
				i--;
				exist = 1;
			}
		}
		if (exist === 1) return;
		axios
			.post(
				// "http://"+this.props.url+"/webhdfs/v1/"+path+"/?op=LISTSTATUS"
				"http://localhost:8000/api/v1/directory/",
				{
					dir: path
				}
			)
			.then(response => {
				this.setState({
					tree: [
						...this.state.tree,
						{ parent: path, dirs: response.data.FileStatuses.FileStatus }
					]
				});
			})
			.catch(error => {
				alert("error");
			});
	}
	find_dir(idx, parent) {
		console.log(this.state.tree);
		if (typeof this.state.tree === "undefined") {
			return;
		} else {
			if (this.state.tree[idx].parent === parent) {
				const { dirs, parent } = this.state.tree[idx];
				return dirs.map((dir, i) => {
					if (dir.type === "DIRECTORY") {
						return (
							<List.Item key={i}>
								<List.Icon
									name="folder"
									onClick={(e, i) =>
										this.toggle_dir(parent + "/" + dir.pathSuffix)
									}
								/>
								<List.Content>
									<List.Header>{dir.pathSuffix}</List.Header>
									<List.Description>owner : {dir.owner}</List.Description>
								</List.Content>
								<List.List>
									{this.state.tree.map((child_dir, j) => {
										if (j <= idx) return;
										else {
											return this.find_dir(j, parent + "/" + dir.pathSuffix);
										}
									})}
								</List.List>
							</List.Item>
						);
					} else if (dir.type === "FILE") {
						const submitInfo =
							"/" +
							parent +
							"/" +
							dir.pathSuffix +
							" " +
							dir.blockSize +
							" " +
							dir.modificationTime;
						return (
							<List.Item key={i}>
								<List.Icon
									name="file"
									onClick={(e, i) => this.props.setFile(submitInfo)}
								/>
								<List.Content>
									<List.Header>{dir.pathSuffix}</List.Header>
									<List.Description>owner : {dir.owner}</List.Description>
								</List.Content>
							</List.Item>
						);
					}
				});
			}
		}
	}
	render() {
		console.log(typeof this.state.tree);
		return (
			<Container>
				<List>{this.find_dir(0, "user")}</List>
			</Container>
		);
	}
}

export default DirectoryList;
