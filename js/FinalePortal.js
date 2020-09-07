'use strict';
import React, { useState } from 'react';

/*
FINALE - Final step in the game
*/


import {
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroText,
  ViroSound,
  ViroNode,
  Viro360Image
} from 'react-viro';

export const FinalePortal = () => {


  // local game state
  const [ text, setText ] = useState('Find a Metrocard in real life, scan it with your phone to escape')
  const [black, setBlack] = useState([0, 0, 0])

  // triggers when final action is complete
  // const _onAnchorFound = () => {
  //   setBlack([0.1, 0.1, 0.1])

  // }

  return (
    <ViroNode>
      <ViroText
      text={text}
      scale={[0.8, 0.8, 0.8]}
      position={[0, 0, -2]}
    />

    {/* Establishes action after image recognition */}
      <ViroARImageMarker
        target={'targetMetrocard'}
        // onAnchorFound={_onAnchorFound}
      >
      <ViroSound
      source={require('./res/sound/you-win.wav')}
      volume={1.0}
      paused={false}
      muted={false}
      loop={false}
      />
      <Viro360Image
            source={require('./res/black.jpg')}
            type="OBJ"
            scale={black}
          />
      </ViroARImageMarker>
      </ViroNode>
  )
}

// declares target for image recognition
ViroARTrackingTargets.createTargets({
  targetMetrocard: {
    source: require('./res/metrocard.png'),
    orientation: 'Up',
    physicalWidth: 0.1,
  },
});

module.exports = FinalePortal;
