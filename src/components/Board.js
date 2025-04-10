import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import Square from './Square';
import { checkWinner } from '../utils/helpers';

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurns] = useState(true);
    const [winner, setWinner] = useState(null);

    const handlePress = (index) => {
        if (squares[index] || winner) return;

        const newSquares = [...squares];
        newSquares[index] = isXTurn ? 'X' : 'O';
        setSquares(newSquares);
        setIsXTurns(!isXTurn);

        const detectedWinner = checkWinner(newSquares);
        if (detectedWinner) {
            setWinner(detectedWinner);
        } else if (!newSquares.includes(null)) {
            setWinner('Draw');
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsXTurns(true);
        setWinner(null);
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
            {winner && (
                <View style={styles.playAgainContainer}>
                    <Text style={styles.winnerText}>
                        {winner === 'Draw' ? "It'a Draw!" : `${winner} Wins!`}
                    </Text>
                    <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
                        <Text style={styles.playAgainText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            )}
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
    winnerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00FFAA',
        marginBottom: 10,
    },
    playAgainButton: {
        backgroundColor: '#00FFAA',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    playAgainText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 18,
    },
    playAgainContainer: {
        marginTop: 20,
        alignItems: 'center',
        alignSelf: 'center',
        width: 300,
    },
});