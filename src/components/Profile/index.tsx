import React, { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useAuth } from '../../hooks/auth';

import { ModalLogout } from '../ModalLogout';
import { Avatar } from '../Avatar';
import { styles } from './style';

export function Profile() {

    const { user, signOut } = useAuth();

    const [openModalLogout, setOpenModalLogout] = useState(false);

    function handleSignOut() {
        setOpenModalLogout(true);
    }

    return(
        <View style={styles.container}>
            <RectButton onPress={handleSignOut}>
                <Avatar urlImage={user.avatar}/>
            </RectButton>
            <View>
                <View style={styles.user}>
                    <Text style={styles.greeting}>Olá,</Text>
                    <Text style={styles.username}>{ user.firstName }</Text>
                </View>
                <Text style={styles.message}>Hoje é dia de vitória </Text>
            </View>
            <ModalLogout visible={openModalLogout} closeModal={handleSignOut}>
                <Text style={styles.title}>Deseja mesmo sair do GamePlay?</Text>
                <View style={styles.buttonArea}>
                    <TouchableOpacity style={styles.buttonRed} onPress={() => setOpenModalLogout(false)}>
                        <Text style={styles.textButton}>Não</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => signOut() && setOpenModalLogout(false)}>
                        <Text style={styles.textButton}>Sim</Text>
                    </TouchableOpacity>
                </View>
            </ModalLogout> 
        </View>
    );
}