import React, { Component } from 'react';
import createFragment from 'react-addons-create-fragment';

class Videos extends Component{
	render(){

		
		let data = [];
		data = this.props.data;
		// console.log(this.props.data);
		// console.log(data.data);

		// for(var i=0;i<data.length;i++){
		// 	data.push({name:data[i].name,description:data[i].description});
		// }

		// this.props.data.data.forEach(function(video){
		// 	data.push({name:video.name,description:video.description,url:video.url});
		// });
		
		return(
			<div>
				{ data }
			</div>
		)
	}
}

export default Videos;