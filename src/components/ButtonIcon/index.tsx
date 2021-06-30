import React from 'react';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { Text, Image, View } from 'react-native';

import DiscordSvg from '../../assets/discord.svg';
import { styles } from './style';

interface Props extends RectButtonProps {
    title: string,
}

export function ButtonIcon({ title, ...rest }: Props) {
    return(
        <RectButton style={styles.container} {...rest}>
            <View style={styles.iconWrapper}>
                <DiscordSvg style={styles.icon} />
            </View>
            <Text style={styles.title}>{title}</Text>
        </RectButton>
    );
}