import React, { useState } from "react";
import { toggleMusic } from "../utils/soundManager";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MusicToggleButton() {
    const [isPlaying, setIsPlaying] = useState(true);

    const handleToggle = () => {
        toggleMusic(isPlaying);
        setIsPlaying(!isPlaying);
    };

    return (
        <TouchableOpacity onPress={handleToggle} style={styles.button}>
            <Text style={styles.text}>{isPlaying ? '🔊' : '🔇'}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        top: 30,
        right: 20,
        padding: 10,
        backgroundColor: '#0ff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: '#0ff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.9,
        shadowRadius: 10,
        elevation: 10,
    },
    text: {
        fontSize: 22,
        color: '#000',
    },
});