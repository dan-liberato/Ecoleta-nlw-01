import styled from 'styled-components'

export const Container = styled.header`
  width: 100%;
  max-width: 1150px;
  padding: 0 50px;

  margin: 0 auto;
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 720px) {
	margin: 48px auto 0;
  }

  @media(max-width: 580px) {
	  flex-direction: column;
  }
`;

export const HeaderLogo = styled.img`
   background: transparent;

   @media(max-width: 580px) {
	  margin-bottom: 48px;
  }
`;