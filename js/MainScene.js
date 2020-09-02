<<<<<<< HEAD
'use strict';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { foundObjectThunk } from '../store/objectState';
import {
  ViroMaterials,
  ViroARScene,
  ViroAmbientLight,
  ViroConstants,
  ViroSpotLight,
} from 'react-viro';
=======
'use strict'
import React, {useState} from 'react'
import {useDispatch} from 'react-redux'
import {ViroMaterials, ViroARScene, ViroAmbientLight, ViroConstants, ViroSpotLight} from 'react-viro'
>>>>>>> e35e81502ff561ba640928aa0557457742a2e574

import PortalOne from './PortalOne';
import Game from './TICTACTOE/TICTACTOE';

function MainScene(props) {
  const [text, setText] = useState('');
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Find the key!');
    } else if (state == ViroConstants.TRACKING_NONE) {
      setText('Oopsie! Something is wrong with your AR. Restart and try again');
    }
  };
  const _onCameraARHitTest = (results) => {};

<<<<<<< HEAD
  const sendObjectsStatus = (status) => dispatch(foundObjectThunk(status));

=======
>>>>>>> e35e81502ff561ba640928aa0557457742a2e574
  return (
    <ViroARScene
      onTrackingUpdated={_onInitialized}
      onCameraARHitTest={_onCameraARHitTest}
    >
      <ViroAmbientLight color="#ffffff" intensity={500} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={20}
        direction={[0, -1, -0.2]}
        position={[0, 5, 1]}
        color="#ffffff"
        castsShadow={true}
        shadowNearZ={0.1}
        shadowFarZ={5}
        shadowOpacity={0.9}
      />
      {/* <Game /> */}
      <PortalOne />
    </ViroARScene>
  );
}

<<<<<<< HEAD
export default MainScene;
=======
module.exports = MainScene
>>>>>>> e35e81502ff561ba640928aa0557457742a2e574

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});
