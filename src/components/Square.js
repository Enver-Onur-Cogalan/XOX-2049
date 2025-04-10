import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

const Square = ({ value, onPress }) => {
    return (
        <TouchableOpacity style={styles.square} onPress={onPress}>
            <Text style={styles.text}>{value}</Text>
        </TouchableOpacity>
    );
};

export default Square;

const styles = StyleSheet.create({
    square: {
        width: '33.33%',
        height: 100,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 48,
        color: '#00FFAA',
        fontWeight: 'bold',
    },
});