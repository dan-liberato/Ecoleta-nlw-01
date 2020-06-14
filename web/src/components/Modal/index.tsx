import React from 'react'

import './styles.css'
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
                <div className="modal">
                    <div className="content">
                        <img src={imageIcon} alt="Cadastro concluído"/>
                        <h1>{message}</h1>
                    </div>
                </div>
            )}
        </>
    )
}

export default Modal