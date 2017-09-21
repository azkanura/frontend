import React, { Component } from 'react';
import axios from 'axios';
import data from './data';

class Video extends Component{
	constructor(props){
		super(props);
		this.state = { data: []};
		this.loadVideosFromServer = this.loadVideosFromServer.bind(this);
	}

	loadVideosFromServer(){
		axios.get(this.props.url)
			.then(res => {
				this.setState({data:res.data});
			})
	}
	componentDidMount(){
		this.loadVideosFromServer();
		setInterval(this.loadVideosFromServer,this.props.pollInterval);
	}
	render(){

		let videoList = this.state.data.map(video=>{
			return (
				<div>
					{ video.name }<br/>
					{ video.description }
					{ video.url }
				</div>
			)
		});
		return (
			<div>videoku
			{ videoList }
			</div>
		)
	}
}

export default Video;