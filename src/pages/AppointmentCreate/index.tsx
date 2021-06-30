import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import { Text, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { COLLECTION_APPOINTMENS } from '../../configs/database';

import { Background } from '../../components/Backgroung';
import { Header } from '../../components/Header';
import { CategorySelect } from '../../components/CategorySelect';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Button } from '../../components/Button';
import { ModalView } from '../../components/ModalView';
import { Guilds } from '../Guilds';
import { GuildProps } from '../../components/Guild';


import { theme } from '../../global/styles/theme';
import { styles } from './style';

export function AppointmentCreate() {

    const [category, setCategory] = useState('');
    const [openGuildsModal, setOpenGuildsModal] = useState(false);
    const [guild, setGuild] = useState<GuildProps>({} as GuildProps);

    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [description, setDescription] = useState('');

    const navigation = useNavigation();

    function handleOpenGuilds() {
        setOpenGuildsModal(true);
    }

    function handleCloseGuilds() {
        setOpenGuildsModal(false);
    }

    function handleGuildSelect(guildSelect: GuildProps) {
        setGuild(guildSelect);
        setOpenGuildsModal(false);
    }

    function handleCategorySelect(categoryId: string) {
        setCategory(categoryId)
    }

    async function handleSave() {
        if( day > '30' || month > '12' ){
            Alert.alert("Ops! Data inválida", "Por favor colocar a data correta do evento!");
        }
        else if (hour > '23' || minute > '59') {
            Alert.alert("Ops! Hora inválida", "Por favor colocar a hora correta do evento!");
        }
        else {
            if( category ) {
                if( guild.name ) {
                    const newAppointment = {
                        id: uuid.v4(),
                        guild,
                        category,
                        date: `${day}/${month} às ${hour}:${minute}h`,
                        description,
                    };
            
                    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENS);
                    const appointments = storage ? JSON.parse(storage) : [];
            
                    await AsyncStorage.setItem(
                        COLLECTION_APPOINTMENS,
                        JSON.stringify([...appointments, newAppointment])
                    );
            
                    navigation.navigate('Home');
                }
                else {
                    Alert.alert("Ops!", "Por favor, selecione um servidor para o agendamento!");
                }
            }
            else {
                Alert.alert("Ops!", "Por favor, selecione uma categoria para o agendamento!");
            }
        }
    } 

    return(
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height' } >
            <Background>
                <ScrollView>
                    <Header title="Agendar partida" />
                    <Text style={[ styles.label, { marginLeft: 24, marginTop: 36, marginBottom: 18 } ]}>Categoria</Text>
                    <CategorySelect
                        hasCheckBox
                        setCategory={handleCategorySelect}
                        categorySelected={category}
                    />
                    <View style={styles.form}>
                        <RectButton onPress={handleOpenGuilds}>
                            <View style={styles.select}>
                                { guild.icon ? <GuildIcon guildId={guild.id} iconId={guild.icon}/> : <View style={styles.image}/> }
                                <View style={styles.selectBody}>
                                    <Text style={styles.label}>{guild.name ? guild.name : 'Selecione um servidor'}</Text>
                                </View>
                                <Feather 
                                    name="chevron-right"
                                    color={theme.colors.heading}
                                    size={18}
                                />
                            </View>
                        </RectButton>
                        <View style={styles.field}>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>Dia e mês</Text>
                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setDay}
                                    />     
                                    <Text style={styles.divider}>/</Text>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setMonth}
                                    />       
                                </View>
                            </View>
                            <View>
                                <Text style={[styles.label, { marginBottom: 12 }]}>Hora e Minuto</Text>
                                <View style={styles.column}>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setHour}
                                    />       
                                    <Text style={styles.divider}>:</Text>
                                    <SmallInput 
                                        maxLength={2} 
                                        onChangeText={setMinute}
                                    />       
                                </View>
                            </View>
                        </View>
                        <View style={[styles.field, { marginBottom: 12 }]}>
                            <Text style={styles.label}>Descrição</Text>
                            <Text style={styles.caracteresLimit}>Max 100 caracteres</Text>
                        </View>
                        <TextArea 
                            multiline
                            maxLength={100}
                            numberOfLines={4}
                            autoCorrect={false}
                            onChangeText={setDescription}
                        />
                        <View style={styles.footer}>
                            <Button title="Agendar" onPress={handleSave}/>
                        </View>
                    </View>
                </ScrollView>
            </Background>
            <ModalView visible={openGuildsModal} closeModal={handleCloseGuilds}>
                <Guilds handleGuildSelect={handleGuildSelect}/>
            </ModalView>
        </KeyboardAvoidingView>
    );
}