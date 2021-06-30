import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    user: {
        flexDirection: 'row',
    },
    greeting: {
        fontFamily: theme.fonts.title500,
        fontSize: 24,
        color: theme.colors.heading,
        marginRight: 6,
    },
    username: {
        fontFamily: theme.fonts.title700,
        fontSize: 24,
        color: theme.colors.heading,
    },
    message: {
        fontFamily: theme.fonts.text400,
        color: theme.colors.highlight,
    },
    buttonArea: {
        flexDirection: "row",
        marginTop: 25,
        paddingHorizontal: 50,
        justifyContent: "space-around",
    },
    button: {
        backgroundColor: theme.colors.secondary50,
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 10
    },
    buttonRed: {
        backgroundColor: theme.colors.primary,
        paddingHorizontal: 50,
        paddingVertical: 15,
        borderRadius: 10
    },
    textButton: {
        color: theme.colors.heading,
        fontFamily: theme.fonts.text500,
        fontSize: 16
    },
    title: {
        textAlign: "center",
        marginTop: 25,
        fontFamily: theme.fonts.title500,
        fontSize: 18,
        color: theme.colors.heading
    }
});