import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function App() {
	const [count, setCount] = useState(1);
	const [numbers, setNumbers] = useState(['']);

	const handleAddInput = () => {
		setCount(count + 1);
		setNumbers([...numbers, '']);
	};

	const handleNumberChange = (index: number, value: string) => {
		const updatedNumbers = [...numbers];
		updatedNumbers[index] = value;
		setNumbers(updatedNumbers);
	};

	const calculateMDC = () => {
		// Implemente a lógica para calcular o MDC aqui
		// Utilize a biblioteca 'mathjs' ou uma função personalizada
	};

	const calculateMMC = () => {
		// Implemente a lógica para calcular o MMC aqui
	};

	return (
		<View>
			{numbers.map((number, index) => (
				<TextInput
					key={index}
					placeholder={`Número ${index + 1}`}
					value={number}
					onChangeText={(value) => handleNumberChange(index, value)}
				/>
			))}
			<Button title="Adicionar Número" onPress={handleAddInput} />
			<Button title="Calcular MDC" onPress={calculateMDC} />
			<Button title="Calcular MMC" onPress={calculateMMC} />
		</View>
	);
}
