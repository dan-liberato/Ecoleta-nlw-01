import styled from 'styled-components'

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #0E0A14ef;
  position: fixed;
  top: 0;
  z-index: 15;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 400ms;
`
export const Content = styled.div`
  color: white;
  width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const Img = styled.img``

export const Title = styled.h1`
  color: white;
  font-size: 34px;
  line-height: 51px;
  margin-top: 32px;
`