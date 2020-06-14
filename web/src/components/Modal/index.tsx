import React from 'react'
import { Container, Content, Img, Title } from './styles'
import CheckIcon from '../../assets/check.svg'
import ErrorIcon from '../../assets/erro.png'

type ModalProps = {
    visible?: boolean,
    message?: string,
    icon?: string
}

const Modal = ({visible, message, icon}: ModalProps) => {
    const imageIcon = icon === 'Success' ? CheckIcon : ErrorIcon

    return (
        <>
            {visible === false ? '' : (
                <Container className="modal">
                    <Content className="content">
                        <Img src={imageIcon} alt="Cadastro concluído"/>
                        <Title>{message}</Title>
                    </Content>
                </Container>
            )}
        </>
    )
}

export default Modal