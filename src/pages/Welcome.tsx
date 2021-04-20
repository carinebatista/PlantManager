import React from 'react';
import {Text, SafeAreaView, Image, TouchableOpacity, StyleSheet} from 'react-native';

import wateringImg from '../assets/watering.png';
import colors from '../styles/colors'

export function Welcome(){
	return(
		<SafeAreaView style={styles.container}>
			<Text style={styles.title}>
				Gerencie {'\n'}
				suas plantas {'\n'}
				de forma fácil 
			</Text>

			<Image source={wateringImg} style={styles.image}/>

			<Text style={styles.subtitle}>
				Não esqueça mais de regar suas {'\n'}
				plantas. Nós cuidamos de lembrar você {'\n'} 
				sempre que precisar.
			</Text>

			<TouchableOpacity 
				style={styles.button} 
				activeOpacity={0.7}
			>
				<Text style={styles.buttonText}>
					>
				</Text>
			</TouchableOpacity>
		</SafeAreaView>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	title:{
		fontSize:32,
		fontWeight:'bold',
		textAlign:'center',
		color: colors.heading,
		marginTop: 38
	},
	subtitle:{
		textAlign: 'center',
		fontSize: 18,
		paddingHorizontal: 20,
		color: colors.heading
	},
	button:{
		backgroundColor: colors.green,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 16,
		marginBottom:10,
		height:56,
		width:56
	},
	image:{
		width: 282,
		height: 272
	},
	buttonText:{
		color: colors.white,
		fontSize: 21
	}
})