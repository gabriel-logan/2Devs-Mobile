import React from 'react';

import { ActivityIndicator } from 'react-native';

export default function Loading(): JSX.Element {
	return (
		<ActivityIndicator
			style={{
				position: 'absolute',
				height: '100%',
				width: '100%',
				backgroundColor: 'white',
			}}
			size={64}
			color="#74b9ff"
		/>
	);
}
