import 'styled-components'

declare module 'styled-components' {
	export interface DefaultTheme {
		title: string
		colors: {
			primary: string
			background: string
			backgroundForm: string
			title: string
			text: string
			titleItem: string
			backgroundItem: string
		}
	}
}