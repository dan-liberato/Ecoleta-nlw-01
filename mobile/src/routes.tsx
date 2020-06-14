import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { useColorScheme } from 'react-native-appearance'

import Home from './pages/Home'
import Points from './pages/Points'
import Detail from './pages/Detail'
import themeStyle from './theme/themeStyles'

const AppStack = createStackNavigator()

const Routes = () => {
    const colorScheme = useColorScheme()
    const theme = colorScheme === 'dark' ? themeStyle.dark : themeStyle.light
    
    return (
        <NavigationContainer>
            <AppStack.Navigator
                headerMode="none"
                screenOptions={{
                    cardStyle: {
                        backgroundColor: theme.backgroundColor
                    }
                }}
            >
                <AppStack.Screen name="Home" component={Home} />
                <AppStack.Screen name="Points" component={Points} />
                <AppStack.Screen name="Detail" component={Detail} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}

export default Routes
