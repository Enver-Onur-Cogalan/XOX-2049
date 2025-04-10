import { StyleSheet, View } from 'react-native';
import React from 'react';

const Board = () => {
    return (
        <View style={styles.board}>
            {/* Buraya 3*3 kareler gelecek */}
        </View>
    )
}

export default Board;

const styles = StyleSheet.create({
    board: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 5,
    },
});