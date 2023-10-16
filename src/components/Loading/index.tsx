import React from 'react';

import { ActivityIndicator } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function Loading(): JSX.Element {
	const { theme } = useTheme();
	return (
		<ActivityIndicator
			style={{
				position: 'absolute',
				height: '100%',
				width: '100%',
				backgroundColor: theme === 'dark' ? 'black' : 'white',
			}}
			size={64}
			color="#74b9ff"
		/>
	);
}
