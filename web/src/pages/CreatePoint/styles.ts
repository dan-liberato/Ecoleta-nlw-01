import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

export const Container = styled.div`
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
`;

export const Nav = styled.nav`
  margin-top: 48px;
  padding: 0 30px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  @media (max-width: 580px) {
    justify-content: center;
  }
`;

export const BackLink = styled(Link)`
  color: ${props => props.theme.colors.title};
  font-weight: bold;
  text-decoration: none;

  display: flex;
  align-items: center;
`;

export const Icon = styled(FiArrowLeft)`
  margin-right: 16px;
  color: ${props => props.theme.colors.primary};
`;

export const Form = styled.form`
  margin: 40px auto;
  padding: 64px;
  max-width: 730px;
  background: ${props => props.theme.colors.backgroundForm};
  border-radius: 8px;

  display: flex;
  flex-direction: column;

  & .leaflet-container {
    width: 100%;
    height: 350px;
    border-radius: 8px;
    margin-bottom: 24px;
    z-index: 5;
  }

  @media (max-width: 580px) {
    padding: 44px;
  }
`;

export const Title = styled.h1`
  font-size: 36px;
`;

export const Fieldset = styled.fieldset`
  margin-top: 64px;
  min-inline-size: auto;
  border: 0;
`;

export const Legend = styled.legend`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 580px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const TitleLegend = styled.h2`
  font-size: 24px;

  @media (max-width: 580px) {
    margin-top: 24px;
  }
`;

export const DescriptionLegend = styled.span`
  font-size: 14px;
  font-weight: normal;
  color: ${props => props.theme.colors.text};
`;

export const Field = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;

  &::disabled {
    cursor: not-allowed;
  }

  &:last-child {
    margin-left: 24px;
  }

  @media (max-width: 580px) {
    &:last-child {
      margin-left: 0;
    }
  }
`;

export const FieldGroup = styled.div`
  flex: 1;
  display: flex;

  @media (max-width: 580px) {
    flex-direction: column;
  }
`;


export const Input = styled.input.attrs({
  placeholderTextColor: "#A0A0B2"
})`
  flex: 1;
  background: ${props => props.theme.colors.backgroundItem};
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: ${props => props.theme.colors.text};
`;

export const Select = styled.select`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 1;
  background: ${props => props.theme.colors.backgroundItem};
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: ${props => props.theme.colors.title};
`;

export const Label = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
`;


export const Create = styled.button`
  width: 260px;
  height: 56px;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;

  &:hover {
    background: #2FB86E;
  }
`;

export const Grid = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;

  @media (max-width: 580px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 380px) {
		grid-template-columns: 1fr;
  }
`;

export const ItemGrid = styled.li`
  background: ${props => props.theme.colors.backgroundItem};
  border: 2px solid ${props => props.theme.colors.backgroundItem};
  height: 180px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  cursor: pointer;

  &.selected {
    background: #E1FAEC;
    border: 2px solid ${props => props.theme.colors.primary};
  }
`;

export const ItemTitle = styled.span`
  flex: 1;
  margin-top: 12px;

  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.titleItem};
`;


/*
#page-create-point {
  width: 100%;
  max-width: 1100px;

  margin: 0 auto;
}

#page-create-point header {
  margin-top: 48px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}

#page-create-point header a {
  color: var(--title-color);
  font-weight: bold;
  text-decoration: none;

  display: flex;
  align-items: center;
}

#page-create-point header a svg {
  margin-right: 16px;
  color: var(--primary-color);
}

#page-create-point form {
  margin: 80px auto;
  padding: 64px;
  max-width: 730px;
  background: #FFF;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
}

#page-create-point form h1 {
  font-size: 36px;
}

#page-create-point form fieldset {
  margin-top: 64px;
  min-inline-size: auto;
  border: 0;
}

#page-create-point form legend {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

#page-create-point form legend h2 {
  font-size: 24px;
}

#page-create-point form legend span {
  font-size: 14px;
  font-weight: normal;
  color: var(--text-color);
}

#page-create-point form .field-group {
  flex: 1;
  display: flex;
}

#page-create-point form .field {
  flex: 1;

  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
}

#page-create-point form .field input[type=text],
#page-create-point form .field input[type=email],
#page-create-point form .field input[type=number] {
  flex: 1;
  background: #F0F0F5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6C6C80;
}

#page-create-point form .field select {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  flex: 1;
  background: #F0F0F5;
  border-radius: 8px;
  border: 0;
  padding: 16px 24px;
  font-size: 16px;
  color: #6C6C80;
}

#page-create-point form .field input::placeholder {
  color: #A0A0B2;
}

#page-create-point form .field label {
  font-size: 14px;
  margin-bottom: 8px;
}

#page-create-point form .field :disabled {
  cursor: not-allowed;
}

#page-create-point form .field-group .field + .field {
  margin-left: 24px;
}

#page-create-point form .field-group input + input {
  margin-left: 24px;
}

#page-create-point form .field-check {
  flex-direction: row;
  align-items: center;
}

#page-create-point form .field-check input[type=checkbox] {
  background: #F0F0F5;
}

#page-create-point form .field-check label {
  margin: 0 0 0 8px;
}

#page-create-point form .leaflet-container {
  width: 100%;
  height: 350px;
  border-radius: 8px;
  margin-bottom: 24px;
  z-index: 5;
}

#page-create-point form button {
  width: 260px;
  height: 56px;
  background: var(--primary-color);
  border-radius: 8px;
  color: #FFF;
  font-weight: bold;
  font-size: 16px;
  border: 0;
  align-self: flex-end;
  margin-top: 40px;
  transition: background-color 0.2s;
  cursor: pointer;
}

#page-create-point form button:hover {
  background: #2FB86E;
}

.items-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  list-style: none;
}

.items-grid li {
  background: #f5f5f5;
  border: 2px solid #f5f5f5;
  height: 180px;
  border-radius: 8px;
  padding: 32px 24px 16px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  text-align: center;

  cursor: pointer;
}

.items-grid li span {
  flex: 1;
  margin-top: 12px;

  display: flex;
  align-items: center;
  color: var(--title-color)
}

.items-grid li.selected {
  background: #E1FAEC;
  border: 2px solid #34CB79;
}*/