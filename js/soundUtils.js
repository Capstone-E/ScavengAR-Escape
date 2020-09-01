import React from 'react';
import { ViroSound } from 'react-viro';

const unlockSound = () => {
    return <ViroSound
    source={require("./res/sound/unlock.wav")}
    />
}

export default unlockSound


