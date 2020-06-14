import React, { useState, useEffect } from 'react'
import Constants from 'expo-constants'
import { Feather as Icon, FontAwesome } from '@expo/vector-icons'
import { View, StyleSheet, TouchableOpacity, Image, Text, Linking } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import * as MailComposer from "expo-mail-composer";
import api from '../../services/api'
import {
	useColorScheme
} from 'react-native-appearance'
import themeStyle from '../../theme/themeStyles'

interface Params {
	point_id: number
}

interface Data {
	point: {
		image: string
		image_url: string
		name: string
		email: string
		whatsapp: string
		city: string
		uf: string
	}
	items: {
		title: string
	}[]
}


const Detail = () => {
	const [data, setData] = useState<Data>({} as Data)
	const navigation = useNavigation()
	const route = useRoute()
	const routeParams = route.params as Params

	const colorScheme = useColorScheme()
	const theme = colorScheme === 'dark' ? themeStyle.dark : themeStyle.light

	useEffect(() => {
		api.get(`points/${routeParams.point_id}`)
		.then(res => setData(res.data))
	}, [])

	function handleNavigateBack() {
		navigation.goBack()
	}

	function handleComposeMail() {
		MailComposer.composeAsync({
			subject: 'Interesse na coleta de resíduos',
			recipients: [data.point.email]
		})
	}

	function handleWhatsapp() {
		Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse na coleta de resíduos`)
	}

	if (!data.point) {
		return null
	}

	return (
		<>
			<View style={styles.container}>
				<TouchableOpacity onPress={handleNavigateBack}>
					<Icon name="arrow-left" color="#34cb79" size={20} />
				</TouchableOpacity>

				<Image
					style={styles.pointImage}
					source={{ uri: data.point.image_url }}
				/>

				<Text style={[styles.pointName, { color: theme.color }]}>{data.point.name}</Text>
				<Text style={[styles.pointItems, { color: theme.color }]}>
					{data.items.map(item => item.title).join(", ")}
				</Text>

				<View style={styles.address}>
					<Text style={[styles.addressTitle, { color: theme.color }]}>Endereço</Text>
					<Text style={[styles.addressContent, { color: theme.color }]}>
						{data.point.city}, {data.point.uf}
					</Text>
				</View>
			</View>

			<View style={styles.footer}>
				<RectButton style={styles.button} onPress={handleWhatsapp}>
					<FontAwesome name="whatsapp" size={20} color="#fff" />
					<Text style={styles.buttonText}>Ligar</Text>
				</RectButton>

				<RectButton style={styles.button} onPress={handleComposeMail}>
					<Icon name="mail" size={20} color="#fff" />
					<Text style={styles.buttonText}>E-mail</Text>
				</RectButton>
			</View>
		</>
	);
}

export default Detail

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 32,
		paddingTop: 20 + Constants.statusBarHeight,
	},

	pointImage: {
		width: '100%',
		height: 120,
		resizeMode: 'cover',
		borderRadius: 10,
		marginTop: 32,
	},

	pointName: {
		color: '#322153',
		fontSize: 28,
		fontFamily: 'Ubuntu_700Bold',
		marginTop: 24,
	},

	pointItems: {
		fontFamily: 'Roboto_400Regular',
		fontSize: 16,
		lineHeight: 24,
		marginTop: 8,
		color: '#6C6C80'
	},

	address: {
		marginTop: 32,
	},

	addressTitle: {
		color: '#322153',
		fontFamily: 'Roboto_500Medium',
		fontSize: 16,
	},

	addressContent: {
		fontFamily: 'Roboto_400Regular',
		lineHeight: 24,
		marginTop: 8,
		color: '#6C6C80'
	},

	footer: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderColor: '#999',
		paddingVertical: 20,
		paddingHorizontal: 32,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},

	button: {
		width: '48%',
		backgroundColor: '#34CB79',
		borderRadius: 10,
		height: 50,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center'
	},

	buttonText: {
		marginLeft: 8,
		color: '#FFF',
		fontSize: 16,
		fontFamily: 'Roboto_500Medium',
	},
});