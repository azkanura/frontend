import React, { Component } from 'react';
import axios from 'axios';
import Videos from './Videos';
import createFragment from 'react-addons-create-fragment';


class VideoList extends Component{
	constructor(props){
		super(props);
		this.state = { data: []};
		this.loadVideosFromServer = this.loadVideosFromServer.bind(this);
	}

	loadVideosFromServer(){
		axios.get(this.props.url)
			.then(res => {
				this.setState({data: res.data});
				// console.log(res.data);
			})
	}
	componentDidMount(){
		this.loadVideosFromServer();
		setInterval(this.loadVideosFromServer, this.props.pollInterval);
	}
	render(){
		this.componentDidMount();
		return (
			<Videos data={ this.state.data } hahai='wuhuhuuuu'/>
		)
	}
}

export default VideoList;