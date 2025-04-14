import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Square from './Square';
import { checkWinner } from '../utils/helpers';
import * as Animatable from 'react-native-animatable';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getWinType } from '../utils/animationHelpers';
import { playBackgroundMusic, stopBackgroundMusic } from '../utils/soundManager';
import MusicToggleButton from './MusicToggleButton';
import CyberButton from 'react-native-cyberpunk-button';
import LottieView from 'lottie-react-native';

const boardSize = 300;
const squareSize = boardSize / 3;

const Board = () => {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXTurn, setIsXTurns] = useState(true);
    const [winner, setWinner] = useState(null);
    const [winningCombo, setWinningCombo] = useState([]);
    const [winType, setWinType] = useState(null);
    const [winnerAnimation, setWinnerAnimation] = useState(undefined);

    useEffect(() => {
        if (winner) {
            const interval = setInterval(() => {
                setWinnerAnimation(prev => (prev === 'flash' ? undefined : 'flash'));
            }, 1500);
            return () => clearInterval(interval);
        }
    }, [winner]);


    useEffect(() => {
        playBackgroundMusic();

        return () => {
            stopBackgroundMusic();
        };
    }, [])

    const handlePress = (index) => {
        if (squares[index] || winner) return;  // When a square is clicked, process the move and check the winner

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
            <LottieView
                source={require('../assets/animations/rain.json')}
                autoPlay
                loop
                resizeMode='cover'
                style={[StyleSheet.absoluteFill, { opacity: 0.3 }]}
            />

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
                        isDraw={winner === 'Draw'}
                    />
                ))}
            </View>

            {winner && (
                <View style={styles.playAgainContainer}>
                    <Animatable.Text
                        animation={winnerAnimation}
                        iterationCount='infinite'
                        easing='ease-in-out'
                        style={styles.glitchWinnerText}
                    >
                        {winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`}
                    </Animatable.Text>
                    <TouchableOpacity onPress={resetGame}>
                        <CyberButton
                            label='Play Again'
                            buttonHeight={80}
                            mainColor='#FFD700'
                            shadowColor='red'
                            glitchDuration={1000}
                            glitchAmplitude={5}
                            labelTextStyle={{ color: 'black' }}
                        />
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
        gap: 20,
    },
    glitchWinnerText: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFD700',
        textShadowColor: 'red',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 10,
        letterSpacing: 2,
        textAlign: 'center',
        transform: [{ skewX: '-5deg' }],
    },
});
