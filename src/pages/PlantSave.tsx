import React, { useState } from 'react';
import {
	StyleSheet,
	Alert,
	Image,
	ScrollView,
	TouchableOpacity,
	Text,
	View,
	Platform
}	from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import DateTimePicker, {Event} from '@react-native-community/datetimepicker';

import { Button } from '../components/Button';

import waterdrop from '../assets/waterdrop.png';
import colors from '../styles/colors'
import fonts from '../styles/fonts';

import {useRoute} from '@react-navigation/core';
import { isBefore } from 'date-fns';

interface Params{
	plant: {
		id: string;
		name: string;
		about: string;
		water_tips: string;
		photo: string;
		environments: [string];
		frequency: {
			times: number;
			repeat_every: string;
		}
	}
}

export function PlantSave(){
	const [selectedDateTime, setSelectedDateTime]= useState(new Date())
	const [showDatePicker, setShowDatePicker ] = useState(Platform.OS === 'ios');

	const route = useRoute();
	const {plant} = route.params as Params; 

	function handleChangeTime(event: Event, dateTime: Date | undefined){
		if(Platform.OS === 'android'){
			setShowDatePicker(oldState => !oldState)
		}
		if(dateTime && isBefore(dateTime, new Date())){
			setSelectedDateTime(new Date())
			return Alert.alert('Escolha uma hora no futuro! ⏰')
		}
		if(dateTime)
			setSelectedDateTime(dateTime)
	}

	return(
		<View style={styles.container}>
			<View style={styles.plantInfo}>
				<SvgFromUri 
					uri={plant.photo}
					height={150}
					width={150}
				/>

				<Text style={styles.plantName}>
					{plant.name}
				</Text>
				<Text style={styles.plantAbout}> 
					{plant.about}
				</Text>
			</View>

			<View style={styles.controller}>
				<View style={styles.tipContainer}>
					<Image 
						source={waterdrop} 
						style={styles.tipImage}
					/>
					<Text style={styles.tipText}>
						{plant.water_tips}
					</Text>
				</View>

				<Text style={styles.alertLabel}>
					Escolha o melhor horário para ser lembrado
				</Text>

				{showDatePicker && (
						<DateTimePicker
							value={selectedDateTime}
							mode="time"
							display= "spinner"
							onChange={handleChangeTime}
						/>
				)}
			

				<Button 
					title="Cadastrar Planta"
					onPress={() => { }}
				/>

			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		justifyContent: 'space-between',
		backgroundColor: colors.shape
	},
	plantInfo:{
		flex:1,
		paddingHorizontal: 30,
		paddingVertical: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: colors.shape
	},
	controller:{
		backgroundColor: colors.white,
		paddingHorizontal:20,
		paddingTop: 20,
		paddingBottom: getBottomSpace() || 20,
	},
	plantName:{
		fontFamily: fonts.heading,
		fontSize: 24,
		color: colors.heading,
		marginTop: 15,
	},
	plantAbout:{
		textAlign: 'center',
		fontFamily: fonts.text,
		color: colors.heading,
		fontSize:17,
		marginTop: 10,
	},
	tipContainer:{
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: colors.blue_light,
		padding: 20,
		borderRadius: 20,
		position: 'relative',
		bottom: 60
	},
	tipImage:{
		width: 56,
		height: 56,
	},
	tipText:{
		flex:1,
		marginLeft: 20,
		fontFamily: fonts.text,
		fontSize: 17,
		color: colors.blue,
		textAlign: 'justify',
	},
	alertLabel:{
		textAlign: 'center',
		fontFamily: fonts.complement,
		color: colors.heading,
		fontSize: 12,
		marginBottom: 5,
	}
})