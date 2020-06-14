import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import Switch from 'react-switch'
import { Container, HeaderLogo } from './styles'

import logo from '../../assets/logo.svg'
import logoW from '../../assets/logo-w.svg'

interface Props {
    toggleTheme(): void
}

const Header: React.FC<Props> = ({ toggleTheme }) => {
    const { colors, title } = useContext(ThemeContext)

    console.log(logo)

    return (
        <Container>
            <HeaderLogo src={title === 'dark' ? logoW : logo} alt="Ecoleta" />

            <Switch
                onChange={toggleTheme}
                checked={title === 'dark'}
                checkedIcon={false}
                uncheckedIcon={false}
                width={40}
                height={12}
                handleDiameter={20}
                offColor="#A0A0B2"
                onColor={colors.primary}
            />
        </Container>
    )
}

export default Header