import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { LeafletMouseEvent } from 'leaflet'
import api from '../../services/api'
import Dropzone from '../../components/Dropzone'
import Modal from '../../components/modal'
import { Map, TileLayer, Marker } from "react-leaflet";
import {
	Container,
	Nav,
	BackLink,
	Icon,
	Form,
	Title,
	Fieldset,
	Legend,
	TitleLegend,
	DescriptionLegend,
	Field,
	FieldGroup,
	Input,
	Select,
	Label,
	Grid,
	ItemGrid,
	ItemTitle,
	Create
} from './styles'

interface Item {
	id: number
	title: string
	image_url: string
}

interface IBGEUFResponse {
	sigla: string
}

interface IBGECityResponse {
	nome: string
}

const CreatePoint = () => {
	const [items, setItems] = useState<Item[]>([])
	const [ufs, setUfs] = useState<string[]>([])
	const [cities, setCities] = useState<string[]>([])
	const [modal, setModal] = useState<boolean>(false)
	const [messageModal, setMessageModal] = useState<string>()
	const [iconModal, setIconModal] = useState<string>()

	const [formData, setFormData] = useState({
		name: '',
		email: '',
		whatsapp: ''
	})

	const [selectedUf, setSelectedUf] = useState('0')
	const [selectedCity, setSelectedCity] = useState('0')
	const [selectedItems, setSelectedItems] = useState<number[]>([])

	const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
	const [selectedPosition, setSelectedPosition] = useState<[number, number]>([0, 0])
	const [selectedFile, setSelectedFile] = useState<File>()


	const history = useHistory()

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(position => {
			const { latitude, longitude } = position.coords

			setInitialPosition([latitude, longitude])
		})

	}, [])

	useEffect(() => {
		api.get('items')
			.then(res => {
				setItems(res.data)
			})
	}, [])

	useEffect(() => {
		axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
			.then(res => {
				const ufInitials = res.data.map(uf => uf.sigla)

				setUfs(ufInitials)
			})
	}, [])

	useEffect(() => {
		axios
			.get<IBGECityResponse[]>(
				`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
			)
			.then(res => {
				const cityNames = res.data.map(city => city.nome)

				setCities(cityNames)
			})

	}, [selectedUf])

	function handleSelectUf(event: ChangeEvent<HTMLSelectElement>) {
		const uf = event.target.value

		setSelectedUf(uf)
	}

	function handleSelectCity(event: ChangeEvent<HTMLSelectElement>) {
		const city = event.target.value

		setSelectedCity(city)
	}

	function handleMapClick(event: LeafletMouseEvent) {
		setSelectedPosition([
			event.latlng.lat,
			event.latlng.lng
		])
	}

	function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
		const { name, value } = event.target

		setFormData({
			...formData,
			[name]: value
		})

	}

	function handleSelectItem(id: number) {
		const alreadySelected = selectedItems
			.findIndex(item => item === id)

		if (alreadySelected >= 0) {
			const filteredItems = selectedItems
				.filter(item => item !== id)

			setSelectedItems(filteredItems)
		} else {
			setSelectedItems([...selectedItems, id])
		}
	}

	async function handleSubmit(event: FormEvent) {
		event.preventDefault()

		const { name, email, whatsapp } = formData
		const uf = selectedUf
		const city = selectedCity
		const items = selectedItems
		const [latitude, longitude] = selectedPosition

		const data = new FormData()

		data.append('name', name)
		data.append('email', email)
		data.append('whatsapp', whatsapp)
		data.append('uf', uf)
		data.append('city', city)
		data.append('latitude', String(latitude))
		data.append('longitude', String(longitude))
		data.append('items', items.join(','))

		if (selectedFile) {
			data.append('image', selectedFile)
		}

		await api.post('points', data)
			.then(res => {
				setModal(true)
				setMessageModal('Cadastro concluído')
				setIconModal('Success')

				setTimeout(() => {
					history.push('/')
				}, 2000)

			})
			.catch(error => {
				console.log(error)
				setModal(true)
				setIconModal('Error')
				setMessageModal('Oops... Algo deu errado. Por favor, tente novamente')
				setTimeout(() => {
					window.location.reload(false)
				}, 2000)
				// window.location.reload(false)
			})

		// alert('Ponto de coleta criado')
		// setModal(false)

	}

	function phoneMask(value: string) {
		return value
			.replace(/\D/g, "")
			.replace(/(\d{2})(\d)/, "($1) $2")
			.replace(/(\d{4})(\d)/, "$1-$2")
			.replace(/(\d{4})-(\d)(\d{4})/, "$1$2-$3")
			.replace(/(-\d{4})\d+?$/, "$1");
	}

	return (
		<>
			<Container>
				<Nav>
					<BackLink to="/">
						<Icon />Voltar para home
					</BackLink>
				</Nav>

				<Form onSubmit={handleSubmit}>
					<Title>Cadastro do ponto <br /> de coleta</Title>

					<Dropzone onFileUploaded={setSelectedFile} />

					<Fieldset>
						<Legend>
							<TitleLegend>Dados</TitleLegend>
						</Legend>

						<Field>
							<Label htmlFor="name">Nome da entidade</Label>
							<Input
								type="text"
								name="name"
								id="name"
								onChange={handleInputChange}
							/>
						</Field>

						<FieldGroup>
							<Field>
								<Label htmlFor="name">E-mail</Label>
								<Input
									type="email"
									name="email"
									id="email"
									onChange={handleInputChange}
								/>
							</Field>

							<Field>
								<Label htmlFor="name">Whatsapp</Label>
								<Input
									type="text"
									name="whatsapp"
									id="whatsapp"
									value={phoneMask(formData.whatsapp)}
									onChange={handleInputChange}
								/>
							</Field>
						</FieldGroup>
					</Fieldset>

					<Fieldset>
						<Legend>
							<TitleLegend>Endereços</TitleLegend>
							<DescriptionLegend>Selecione o endereço no mapa</DescriptionLegend>
						</Legend>

						<Map
							center={initialPosition}
							zoom={15}
							onClick={handleMapClick}
						>
							<TileLayer
								attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
								url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
							/>

							<Marker position={selectedPosition} />
						</Map>

						<FieldGroup>
							<Field>
								<Label htmlFor="uf">Estado (UF)</Label>
								<Select
									name="uf"
									id="uf"
									value={selectedUf}
									onChange={handleSelectUf}
								>
									<option value="0">Selecione uma UF</option>
									{ufs.map((uf) => (
										<option key={uf} value={uf}>
											{uf}
										</option>
									))}
								</Select>
							</Field>

							<Field>
								<Label htmlFor="city">Cidade</Label>
								<Select
									name="city"
									id="city"
									value={selectedCity}
									onChange={handleSelectCity}
								>
									<option value="0">Selecione a Cidade</option>
									{cities.map((city) => (
										<option key={city} value={city}>
											{city}
										</option>
									))}
								</Select>
							</Field>
						</FieldGroup>
					</Fieldset>

					<Fieldset>
						<Legend>
							<TitleLegend>Ítens de coleta</TitleLegend>
							<DescriptionLegend>Selecione um ou mias itens abaixo</DescriptionLegend>
						</Legend>

						<Grid>
							{items.map((item) => (
								<ItemGrid
									key={String(item.id)}
									onClick={() => handleSelectItem(item.id)}
									className={selectedItems.includes(item.id) ? 'selected' : ''}
								>
									<img src={item.image_url} alt={item.title} />
									<ItemTitle>{item.title}</ItemTitle>
								</ItemGrid>
							))}
						</Grid>
					</Fieldset>

					<Create type="submit">Cadastrar ponto de coleta</Create>
				</Form>
			</Container>

			<Modal visible={modal} message={messageModal} icon={iconModal}/>
		</>
	);
}

export default CreatePoint