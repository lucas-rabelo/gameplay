import React, { useState, useCallback, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Appointment, AppointmentProps } from '../../components/Appointment';
import { CategorySelect } from '../../components/CategorySelect';
import { ButtonAdd } from '../../components/ButtonAdd';
import { Profile } from '../../components/Profile';
import { Background  } from '../../components/Backgroung';
import { ListDivider } from '../../components/ListDivider';
import { ListHeader } from '../../components/ListHeader';
import { Load } from '../../components/Load';

import { COLLECTION_APPOINTMENS } from '../../configs/database';

import { styles } from './style';
import { ModalLogout } from '../../components/ModalLogout';
import { Button } from '../../components/Button';

export function Home() {
    
    const [category, setCategory] = useState('');
    const [appointments, setAppointments] = useState<AppointmentProps[]>([]);
    const [loading, setLoading] = useState(true);

    const navigation = useNavigation();

    function handleCategorySelect(categoryId: string) {
        categoryId === category ? setCategory('') : setCategory(categoryId)
    }

    function handleAppointmentsDetails(guildSelected: AppointmentProps) {
        navigation.navigate('AppointmentDetails', { guildSelected });
    }

    function handleAppointmentsCreate() {
        navigation.navigate('AppointmentCreate');
    }

    async function loadAppointments() {
        const response = await AsyncStorage.getItem(COLLECTION_APPOINTMENS);
        const storage: AppointmentProps[] = response ? JSON.parse(response) : [];

        if(category) {
            setAppointments(storage.filter(item => item.category === category));
        } else {
            setAppointments(storage);
        }
        setLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadAppointments();
    }, [category]));

    function handleDeleteAppointments() {
        Alert.alert("Aviso", "Tem certeza que deseja excluir todos os agendamentos?",
        [
            {
                text: "Não",
                style: "cancel"
            },
            {
                text: "Sim",
                onPress: (async () => {
                    await AsyncStorage.removeItem(COLLECTION_APPOINTMENS);
                    loadAppointments();
                })
            }
        ]);
    }

    return(
        <Background>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd onPress={handleAppointmentsCreate}/>
            </View>
            <CategorySelect 
                categorySelected={category}
                setCategory={handleCategorySelect}
            />
            {
                loading ? <Load /> :
                <>
                <ListHeader title="Partidas Agendadas" subtitle={`Total ${appointments.length}`}/>
                <FlatList 
                    data={appointments}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Appointment data={item} onPress={() => handleAppointmentsDetails(item)}/>
                    )}
                    contentContainerStyle={{ paddingBottom: 69 }}
                    ItemSeparatorComponent={() => <ListDivider />}
                    style={styles.matches}
                    showsVerticalScrollIndicator={false}
                />
                </>
            }
            <View style={styles.buttonArea}>
                <Button title="Excluir agendamentos" onPress={handleDeleteAppointments}/>
            </View>
        </Background>
    );
}