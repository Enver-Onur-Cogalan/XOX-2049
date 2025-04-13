import SoundPlayer from 'react-native-sound-player';

let isLooping = true;

export const playBackgroundMusic = () => {
    try {
        SoundPlayer.playSoundFile('cyberpunk', 'mp3');

        SoundPlayer.addEventListener('FinishedPlaying', () => {
            if (isLooping) {
                SoundPlayer.playSoundFile('cyberpunk', 'mp3');
            }
        });

    } catch (e) {
        console.log('error:', e);
    }
};

export const stopBackgroundMusic = () => {
    SoundPlayer.stop();
};

export const toggleMusic = (isPlaying) => {
    if (isPlaying) {
        stopBackgroundMusic();
    } else {
        isLooping = true;
        playBackgroundMusic();
    }
};
