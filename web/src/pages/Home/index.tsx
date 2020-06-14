import React from 'react'
import {
    Container,
    Content,
    Main,
    Title,
    Description,
    LinkTo,
    Icon,
	Svg,
	Bold
} from './styles'

const Home = () => {
	return (
        <Container>
            <Content>

                <Main>
                    <Title>Seu marketplace de coleta de resíduos</Title>
                    <Description>
                        Ajudamos pessoas a encontrarem pontos <br /> de coleta de forma
                        eficiente.
                    </Description>

                    <LinkTo to="/create-point">
                        <Icon>
                            <Svg />
                        </Icon>
                        <Bold>Cadastre um ponto de coleta</Bold>
                    </LinkTo>
                </Main>
            </Content>
        </Container>
    );
}

export default Home