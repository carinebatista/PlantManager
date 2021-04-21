import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

import { Welcome } from '../pages/Welcome';
import {UserIndentification} from '../pages/UserIndentification'
import { Confirmation } from '../pages/Confirmation';

const stackRoutes = createStackNavigator();

const appRoutes: React.FC = () => (
	<stackRoutes.Navigator
		headerMode = "none"
		screenOptions={{
			cardStyle: {
				backgroundColor: colors.white		
			},
		}}
	>
		<stackRoutes.Screen 
			name="Welcome"
			component= {Welcome}
		/>
		<stackRoutes.Screen 
			name="UserIndentification"
			component= {UserIndentification}
		/>
		<stackRoutes.Screen 
			name="Confirmation"
			component= {Confirmation}
		/>

	</stackRoutes.Navigator>
)
export default appRoutes;