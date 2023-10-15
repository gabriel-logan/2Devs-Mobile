import { useState } from 'react';

import { Text, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';

export default function NumberConverterPage() {
	const [selectedLanguage, setSelectedLanguage] = useState();

	return (
		<View>
			<Picker
				selectedValue={selectedLanguage}
				onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
			>
				<Picker.Item label="Java" value="java" />
				<Picker.Item label="JavaScript" value="js" />
			</Picker>
			<Text>Number converter page</Text>
		</View>
	);
}
