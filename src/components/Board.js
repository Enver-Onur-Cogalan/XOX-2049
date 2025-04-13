import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Square from './Square';
import { checkWinner } from '../utils/helpers';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWinType } from '../utils/animationHelpers';
import { playBackgroundMusic, stopBackgroundMusic } from '../utils/soundManager';
import MusicToggleButton from './MusicToggleButton';

const boardSize = 300;
const squareSize = boardSize / 3;

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurns] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningCombo, setWinningCombo] = useState([]);
    const [winType, setWinType] = useState(null);

    useEffect(() => {
        playBackgroundMusic();

        return () => {
            stopBackgroundMusic();
        };
    }, [])

    const handlePress = (index) => {
        if (squares[index] || winner) return;

        const newSquares = [...squares];
        newSquares[index] = isXTurn ? 'X' : 'O';
        setSquares(newSquares);
        setIsXTurns(!isXTurn);

        const result = checkWinner(newSquares);

        if (result?.winner) {
            setWinner(result.winner);
            setWinningCombo(result.winningCombo);
            setWinType(getWinType(result.winningCombo));
        } else if (!newSquares.includes(null)) {
            setWinner('Draw');
        }
    };

    const resetGame = () => {
        setSquares(Array(9).fill(null));
        setIsXTurns(true);
        setWinner(null);
        setWinningCombo([]);
        setWinType(null);
    };

    const isWinningCombo = (index) => {
        return winningCombo.includes(index);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <MusicToggleButton />
            <View style={styles.board}>
                {squares.map((value, index) => (
                    <Square
                        key={index}
                        value={value}
                        onPress={() => handlePress(index)}
                        isWinning={winningCombo.includes(index)}
                        winType={isWinningCombo(index) ? winType : null}
                        index={index}
                    />
                ))}
            </View>

            {winner && (
                <View style={styles.playAgainContainer}>
                    <Animatable.Text
                        animation='pulse'
                        iterationCount='infinite'
                        easing='ease-in-out'
                        style={styles.winnerText}
                    >
                        {winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}
                    </Animatable.Text>
                    <TouchableOpacity style={styles.playAgainButton} onPress={resetGame}>
                        <Text style={styles.playAgainText}>Play Again</Text>
                    </TouchableOpacity>
                </View>
            )}
        </SafeAreaView>
    );
};

export default Board;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
    },
    board: {
        width: 300,
        height: 300,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
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
