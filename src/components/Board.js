import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Square from './Square';

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurns] = useState(true);

    const handlePress = (index) => {
        if (squares[index]) return;

        const newSquares = [...squares];
        newSquares[index] = isXTurn ? 'X' : 'O';
        setSquares(newSquares);
        setIsXTurns(!isXTurn);
    };

    return (
        <View style={styles.board}>
            {squares.map((value, index) => (
                <Square
                    key={index}
                    value={value}
                    onPress={() => handlePress(index)}
                />
            ))}
        </View>
    );
};

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