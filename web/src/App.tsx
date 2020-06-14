import React from 'react'
import { ThemeProvider, DefaultTheme } from 'styled-components'
import usePersistedState from './utils/usePersistedState'

import Routes from './routes'
import GlobalStyles from './styles/global'
import light from './styles/themes/light'
import dark from './styles/themes/dark'

import Header from './components/Header'

const App = ()=> {
	const [theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)

	const toggleTheme = () => {
		setTheme(theme.title === 'light' ? dark : light)
	}

	return (
		<ThemeProvider theme={theme}>

			<GlobalStyles />
			<div className="app">
				<Header toggleTheme={toggleTheme} />
				<Routes />
			</div>

		</ThemeProvider>
	)
}

export default App
