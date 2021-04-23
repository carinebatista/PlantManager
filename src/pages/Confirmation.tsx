import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
} from 'react-native'

import colors from '../styles/colors';
import fonts from '../styles/fonts'

interface Params{
	title: string;
	subtitle: string;
	buttonTitle: string;
	icon: 'smile' | 'hug';
	nextScren: string;
}

const emojis ={
	hug: '🤗',
	smile: '😃'
}

import {Button} from '../components/Button'
import { useNavigation, useRoute } from '@react-navigation/core';
import { PlantSelect } from './PlantSelect';

export function Confirmation(){
	const navigation =useNavigation();
	const routes = useRoute();

	const {
		title,
		subtitle,
		buttonTitle,
		icon,
		nextScren
	}= routes.params as Params;
	
	function handleMoveOn(){
		navigation.navigate(nextScren);
	}

	return(
		<SafeAreaView style={styles.container}>
			<View style={styles.content}>
				<Text style={styles.emoji}>
					{emojis[icon]}
				</Text>

				<Text style={styles.title}>
					{title}
				</Text>
				
				<Text style={styles.subtitle}>
					{subtitle}
				</Text>
		

				<View style={styles.footer}>
					<Button 
						title={buttonTitle}
						onPress= {handleMoveOn}
					/>
				</View>
			</View>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-around'
	},
	content:{
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%'
	},
	title:{
		fontSize: 22,
		fontFamily: fonts.heading,
		textAlign: 'center',
		color: colors.heading,
		lineHeight: 38,
		marginTop: 15
	},
	emoji:{
		fontSize: 78
	},
	subtitle:{
		fontFamily: fonts.text,
		textAlign: 'center',
		fontSize: 17,
		paddingVertical: 10,
		color: colors.heading
	},
	footer:{
		width: '100%',
		paddingHorizontal: 50,
		marginTop: 20
	}
})