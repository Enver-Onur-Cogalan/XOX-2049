import { StyleSheet, Text, TouchableOpacity, View, Animated, Easing } from 'react-native';
import React, { useEffect, useRef } from 'react';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const Square = ({ value, onPress, isWinning, winType, index }) => {
    const animation = useRef(new Animated.Value(0)).current;
    const shakeAnim = useRef(new Animated.Value(0)).current;
    const glowAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        if (isWinning) {
            Animated.parallel([
                Animated.timing(animation, {
                    toValue: 1,
                    duration: 800,
                    easing: Easing.out(Easing.exp),
                    useNativeDriver: false,
                }),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(shakeAnim, {
                            toValue: 2,
                            duration: 50,
                            useNativeDriver: false,
                        }),
                        Animated.timing(shakeAnim, {
                            toValue: -2,
                            duration: 50,
                            useNativeDriver: false,
                        }),
                        Animated.timing(shakeAnim, {
                            toValue: 0,
                            duration: 50,
                            useNativeDriver: false,
                        }),
                    ])
                ),
                Animated.loop(
                    Animated.sequence([
                        Animated.timing(glowAnim, {
                            toValue: 0.5,
                            duration: 300,
                            useNativeDriver: false,
                        }),
                        Animated.timing(glowAnim, {
                            toValue: 2,
                            duration: 300,
                            useNativeDriver: false,
                        }),
                    ])
                )
            ]).start();
        } else {
            animation.setValue(0);
            shakeAnim.setValue(0);
            glowAnim.setValue(1);
        }
    }, [isWinning]);

    const widthAnim = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });
    const heightAnim = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
    });

    const getColLeft = () => '50%'

    const colLeftPosition = getColLeft(index);

    const lineStyle = [
        styles.lineOverlay,
        winType === 'row' && {
            width: widthAnim,
            height: 2,
            transform: [{ translateY: shakeAnim }],
        },
        winType === 'col' && {
            height: heightAnim,
            width: 2,
            left: colLeftPosition,
            top: 0,
            transform: [{ translateX: shakeAnim }],
        },
        (winType === 'diagRight' || winType === 'diagLeft') && {
            width: widthAnim,
            transform: [
                { rotate: winType === 'diagRight' ? '45deg' : '-45deg' },
                { translateY: shakeAnim },
            ]
        }
    ].filter(Boolean);

    return (
        <TouchableOpacity style={styles.square} onPress={onPress}>
            {value ? (
                <MaskedView
                    style={styles.maskedView}
                    maskElement={
                        <View style={styles.maskInner}>
                            <Text style={styles.text}>
                                {value}
                            </Text>
                        </View>
                    }
                >
                    <LinearGradient
                        colors={value === 'X' ? ['#FF4C4C', '#FF0000'] : ['#00FFFF', '#007FFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 0, y: 1 }}
                        style={styles.gradient}
                    />
                </MaskedView>
            ) : null}
            {isWinning && (
                <Animated.View style={[lineStyle,
                    {
                        opacity: glowAnim.interpolate({
                            inputRange: [0.5, 2],
                            outputRange: [0.5, 1],
                        }),
                        shadowRadius: glowAnim.interpolate({
                            inputRange: [0.5, 2],
                            outputRange: [2, 20],
                        }),
                    }
                ]}
                />
            )}
        </TouchableOpacity>
    );
};

export default Square;

const styles = StyleSheet.create({
    square: {
        width: '33.33%',
        height: 100,
        borderWidth: 1,
        borderColor: '#FFD700',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        position: 'relative',
    },
    maskedView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    maskInner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    gradient: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    text: {
        fontSize: 48,
        fontWeight: 'bold',
        textAlign: 'center',
        backgroundColor: 'transparent',
    },
    lineOverlay: {
        position: 'absolute',
        top: '50%',
        left: 0,
        right: 0,
        height: 2,
        backgroundColor: '#FFD700',
        borderRadius: 2,
        shadowColor: '#00FFFF',
        shadowOpacity: 1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 10,
    },
});
