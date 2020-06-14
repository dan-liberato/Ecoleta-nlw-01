import React, { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather  as Icon, MaterialIcons } from '@expo/vector-icons'
import {
	View,
	Image,
	ImageBackground,
	StyleSheet,
	Text,
	KeyboardAvoidingView,
	SafeAreaView,
	Platform
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useHeaderHeight } from '@react-navigation/stack'
import  RNPickerSelect from 'react-native-picker-select'
import {
	useColorScheme
} from 'react-native-appearance'
import themeStyle from '../../theme/themeStyles'
import axios from 'axios'


interface IBGEUfResponse {
	sigla: string
}

interface IBGECityResponse {
	nome: string
}

const Home = () => {
	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? themeStyle.dark : themeStyle.light

	const [ufs, setUfs] = useState<string[]>([])
	const [cities, setCities] = useState<string[]>([])
	const [selectedUf, setSelectedUf] = useState('0')
	const [selectedCity, setSelectedCity] = useState('0')

	const navigation = useNavigation()
	const headerHeight = useHeaderHeight()

	useEffect(() => {
		axios.get<IBGEUfResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
		.then(res => {
			const ufInitials = res.data.map(uf => uf.sigla)
			setUfs(ufInitials)
		})
	}, [])

	useEffect(() => {
		axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`)
		.then(res => {
			const cityNames = res.data.map(city => city.nome)
			setCities(cityNames)
		})
	}, [selectedUf])

	function handleNavigateToPoints(uf: string, city: string) {

		if (uf && city === '0' || uf && city === null) {
			Alert.alert('Por favor, selecione a UF e Cidade')
		} else {
			navigation.navigate("Points", {
				uf,
				city
			})
		}
	}

	function handleSelectUf(uf: string) {
		setSelectedUf(uf)
	}

	function handleSelectCity(cityName: string) {
		setSelectedCity(cityName)
	}

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS == "ios" ? "padding" : undefined }
				keyboardVerticalOffset={ headerHeight + 64 }
			>
				<ImageBackground
					style={styles.container}
					source={theme.image}
					imageStyle={{ width: 274, height: 368 }}
				>
					<View style={styles.main}>
						<Image source={theme.logo} />

						<Text style={[styles.title, {color: theme.color}]}>
							Seu marketplace de coleta de resíduos
						</Text>
						<Text style={[styles.description, { color: theme.color }]}>
							Ajudamos pessoas a encontrarem pontos de
							coleta de forma eficiente.
						</Text>
					</View>

					<View style={styles.footer}>
						<RNPickerSelect
							style={{
								...pickerSelectStyles,
								iconContainer: {
									top: 20,
									right: 12,
								},
							}}
							placeholder={{
								label: 'Selecione a UF',
								value: null,
								color: "#6C6C80",
							}}
							useNativeAndroidPickerStyle={false}
							value={selectedUf}
							onValueChange={value => handleSelectUf(value)}
							items={ufs.map(uf => (
								{label: uf, value: uf}
							))}
							Icon={() => {
								return <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
							}}
						/>

						<View style={{ paddingVertical: 8 }} />

						<RNPickerSelect
							style={{
								...pickerSelectStyles,
								iconContainer: {
									top: 20,
									right: 12,
								},
							}}
							placeholder={{
								label: 'Selecione a Cidade',
								value: null,
								color: "#6C6C80",
							}}
							useNativeAndroidPickerStyle={false}
							value={selectedCity}
							onValueChange={city => handleSelectCity(city)}
							items={cities.map(city => (
								{label: city, value: city}
							))}
							Icon={() => {
								return <MaterialIcons name="keyboard-arrow-down" size={24} color="gray" />
							}}
						/>

						<View style={{ paddingVertical: 3 }} />

						<RectButton
							style={styles.button}
							onPress={() => handleNavigateToPoints(selectedUf, selectedCity)}
						>
							<View style={styles.buttonIcon}>
								<Text>
									<Icon
										name="arrow-right"
										color="#fff"
										size={24}
									/>
								</Text>
							</View>
							<Text style={styles.buttonText}>Entrar</Text>
						</RectButton>
					</View>
				</ImageBackground>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
	},

	main: {
		flex: 1,
		justifyContent: "center",
		height: 300,
	},

	title: {
		fontSize: 32,
		fontFamily: "Ubuntu_700Bold",
		maxWidth: 260,
		marginTop: 64,
	},

	description: {
		color: "#6C6C80",
		fontSize: 16,
		marginTop: 16,
		fontFamily: "Roboto_400Regular",
		maxWidth: 260,
		lineHeight: 24,
	},

	footer: {},

	select: {},

	input: {
		height: 60,
		backgroundColor: "#FFF",
		borderRadius: 10,
		marginBottom: 8,
		paddingHorizontal: 24,
		fontSize: 16,
	},

	button: {
		backgroundColor: "#34CB79",
		height: 60,
		flexDirection: "row",
		borderRadius: 5,
		overflow: "hidden",
		alignItems: "center",
		marginTop: 8,
	},

	buttonIcon: {
		height: 60,
		width: 60,
		backgroundColor: "rgba(0, 0, 0, 0.1)",
		justifyContent: "center",
		alignItems: "center",
	},

	buttonText: {
		flex: 1,
		justifyContent: "center",
		textAlign: "center",
		color: "#FFF",
		fontFamily: "Roboto_500Medium",
		fontSize: 16,
	},
});


const pickerSelectStyles = StyleSheet.create({
	inputIOS: {
		fontSize: 16,
		paddingVertical: 15,
		paddingHorizontal: 24,
		borderRadius: 5,
		color: "#b3b3b3",
		paddingRight: 30,
		backgroundColor: "white",
	},
	inputAndroid: {
		fontSize: 16,
		paddingHorizontal: 24,
		paddingVertical: 15,
		borderRadius: 5,
		paddingRight: 30,
		backgroundColor: "white",
		color: "#b3b3b3"
	},
})


export default Home