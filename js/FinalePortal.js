'use strict';
import React, { useState } from 'react';

import {
  ViroNode,
  ViroARTrackingTargets,
  ViroARImageMarker,
  ViroText
} from 'react-viro';

import TrainPortal from './TrainPortal'

export const FinalePortal = () => {

  const [ text, setText ] = useState('Find a Metrocard in real life, scan it with your phone to escape')

  const _onClick = () => {
    setText('Find a Metrocard in real life, scan it with your phone to escape')
    //something ends or resets the game here
  }

  const _onAnchorFound = () => {
    // setPortalSize(standardPortalSize)
  }

  return (
    <ViroNode>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1.5]}
      />
      <ViroARImageMarker
        target={'targetMetrocard'}
        onAnchorFound={_onAnchorFound}
      >
        <TrainPortal />
      </ViroARImageMarker>
    </ViroNode>
  )

}

ViroARTrackingTargets.createTargets({
  targetMetrocard: {
    source: require('./res/metrocard.png'),
    orientation: 'Up',
    physicalWidth: 0.1,
  },
});

module.exports = FinalePortal;
