import React, { useEffect, useState } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Image,
	FlatList,
} from 'react-native';
import {Header} from '../components/Header'
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import { PlantProps, loadPlant, removePlant} from '../libs/storage';
import {formatDistance} from 'date-fns'
import {pt} from 'date-fns/locale'
import fonts from '../styles/fonts';
import { PlantCardSecondary } from '../components/PlantCardSecondary';
import { Load } from '../components/Load';
import { Alert } from 'react-native';

export function MyPlants(){
	const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
	const [loading, setLoading] = useState(true);
	const [nextWatered, setNextWatered] = useState<string>()

	function handleRemove(plant:PlantProps){
		Alert.alert('Remover', `Deseja Remover a ${plant.name}?`, [
			{
				text: 'Não 🙏',
				style: 'cancel'
			},{
				text: 'Sim 😢 ',
				onPress: async () => {
					try{
						await removePlant(plant.id)
						setMyPlants((oldData)=> (
							oldData.filter((item) => item.id !== plant.id )
						))
					} catch(error){
						Alert.alert('Não foi possível remover! 😢 ');
					}
				}
			}
		])
	}

	useEffect(() =>{
		async function loadStorageData(){
			const plantsStoraged = await loadPlant()

			const nextTime = formatDistance(
				new Date(plantsStoraged[0].dateTimeNotification).getTime(),
				new Date().getTime(),
				{locale: pt }
			);
			setNextWatered(
				`Não esqueça de regar a ${plantsStoraged[0].name} à ${nextTime}.`
			)
			setMyPlants(plantsStoraged)
			setLoading(false);
		}
		loadStorageData();
	}, [])

	if(loading)
	return <Load/>

	return(
		<View style={styles.container}>
			<Header/>
			<View style={styles.spotlight}>
				<Image 
					source={waterdrop} 
					style={styles.spotlightImage}
				/>
				<Text style={styles.spotlightText}> 
					{nextWatered}
				</Text>
			</View>

			<View style={styles.plants}>
				<Text style={styles.plantsTitle}>
			 		Próximas regadas
			  </Text>

				<FlatList
					data={myPlants}
					keyExtractor={item => String(item.id)}
					renderItem={({ item }) => (
						<PlantCardSecondary 
							data={item} 
							handleRemove={() => {handleRemove(item)}}
						/>
					)}
			
					showsVerticalScrollIndicator={false}
					contentContainerStyle={{flex: 1}}
				/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container:{
		flex:1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 30,
		backgroundColor: colors.background,
	},
	spotlight:{
		backgroundColor: colors.blue_light,
		paddingHorizontal: 20,
		borderRadius: 20,
		height: 80,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	spotlightImage:{
		width: 60,
		height: 60
	},
	spotlightText:{
		flex: 1,
		color: colors.blue,
		fontSize: 13,
		paddingHorizontal: 11,
	}, 
	plants:{
		flex: 1,
		width: '100%'
	},
	plantsTitle:{
		fontSize:22,
		fontFamily: fonts.heading,
		color: colors.heading,
		marginVertical: 14, 

	}
})