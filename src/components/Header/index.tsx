import React, { ReactNode } from 'react';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { BorderlessButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { styles } from './style';
import { theme } from '../../global/styles/theme';

interface Props {
    title: string;
    action?: ReactNode;
}

export function Header({ title, action }: Props) {

    const navigation = useNavigation();
    const { heading, secondary40, secondary100 } = theme.colors;

    function handleGoBack(){
        navigation.goBack();
    }

    return(
        <LinearGradient
            style={styles.container}
            colors={[secondary40, secondary100]}
        >
            <BorderlessButton onPress={handleGoBack}>
                <Feather name="arrow-left" size={24} color={heading} />
            </BorderlessButton>

            <Text style={styles.title}>
                { title }
            </Text>

            {
                action ?
                <View>
                    { action }
                </View>
                :
                <View style={{ width: 24 }} />
            }
        </LinearGradient> 
    );
}