import React from 'react';
import ReactDOM from 'react-dom';
import VideoList from './VideoList';

ReactDOM.render(
	<VideoList url="http://localhost:5000/videos" pollInterval={2000} />,
	document.getElementById('app')
);