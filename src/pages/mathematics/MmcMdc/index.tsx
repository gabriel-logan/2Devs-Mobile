import React, { useState } from 'react';
import { Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

interface Props {}

const MmcMdcPage: React.FC<Props> = () => {
	const [count, setCount] = useState<number>(1);
	const [numbers, setNumbers] = useState<string[]>(['']);
	const [mdcResult, setMdcResult] = useState<string>('');
	const [mmcResult, setMmcResult] = useState<string>('');

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
		try {
			const parsedNumbers = numbers.map((num) => parseInt(num));
			const mdc = calculateGCD(parsedNumbers);
			setMdcResult(`MDC: ${mdc}`);
		} catch (error) {
			setMdcResult('Erro ao calcular o MDC');
		}
	};

	const calculateMMC = () => {
		try {
			const parsedNumbers = numbers.map((num) => parseInt(num));
			const mmc = calculateLCM(parsedNumbers);
			setMmcResult(`MMC: ${mmc}`);
		} catch (error) {
			setMmcResult('Erro ao calcular o MMC');
		}
	};

	const t = (text: string) => {
		// Função de tradução, substitua pelo seu sistema de internacionalização
		return text;
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			{numbers.map((number, index) => (
				<TextInput
					key={index}
					style={styles.input}
					placeholder={t(`Número ${index + 1}`)}
					value={number}
					onChangeText={(value) => handleNumberChange(index, value)}
				/>
			))}
			<Button title={t('Adicionar Número')} onPress={handleAddInput} />
			<Button title={t('Calcular MDC')} onPress={calculateMDC} />
			<Button title={t('Calcular MMC')} onPress={calculateMMC} />
			<Text>{t(mdcResult)}</Text>
			<Text>{t(mmcResult)}</Text>
		</ScrollView>
	);
};

const calculateGCD = (numbers: number[]) => {
	const gcd = (a: number, b: number): number => {
		if (b === 0) return a;
		return gcd(b, a % b);
	};

	return numbers.reduce((acc, num) => gcd(acc, num), numbers[0]);
};

const calculateLCM = (numbers: number[]) => {
	const gcd = (a: number, b: number): number => {
		if (b === 0) return a;
		return gcd(b, a % b);
	};

	const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);

	return numbers.reduce((acc, num) => lcm(acc, num), 1);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f5f5f5',
		padding: 16,
	},
	input: {
		width: '80%',
		height: 40,
		borderWidth: 1,
		borderColor: '#ccc',
		marginBottom: 10,
		paddingLeft: 10,
		backgroundColor: 'white',
		borderRadius: 5,
	},
});

export default MmcMdcPage;
