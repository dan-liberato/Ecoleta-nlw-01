import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { FiUpload } from 'react-icons/fi'

import {
	Container,
	Img,
	Text,
	Input
} from './styles'

interface Props {
	onFileUploaded: (file: File) => void
}

const Dropzone: React.FC<Props> = ({ onFileUploaded }) => {
	const [selectedFileUrl, setSelectedFileUrl] = useState('')
	const onDrop = useCallback((acceptedFiles) => {
		const file = acceptedFiles[0]
		const fileUrl = URL.createObjectURL(file)

		setSelectedFileUrl(fileUrl)
		onFileUploaded(file)
	}, [onFileUploaded])

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: 'image/*'
	})

	return (
		<Container className="dropzone" {...getRootProps()}>
			<Input {...getInputProps()} accept="image/*" />
			{ selectedFileUrl
				? <Img src={selectedFileUrl} alt="Imagem do ponto de coleta"/>
				: (
					<Text>
						<FiUpload />
						Imagem do ponto de coleta
					</Text>
				)
			}
		</Container>
	)
}

export default Dropzone