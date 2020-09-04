'use strict';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  ViroMaterials,
  ViroARScene,
  ViroAmbientLight,
  ViroConstants,
  ViroSpotLight,
} from 'react-viro';
// import PortalOne from './PortalOne';
// import PortalTwo from './PortalTwo.js'
import FinalePortal from './FinalePortal.js'
// import TrainPortal from './TrainPortal'

const Smoke = require('./SmokeEffect');

function MainScene(props) {
  const [text, setText] = useState('');
  const dispatch = useDispatch();

  const _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Find the key!');
    } else if (state == ViroConstants.TRACKING_NONE) {
      setText('Oopsie! Something is wrong with your AR. Restart and try again');
    }
  };
  const _onCameraARHitTest = (results) => {};

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
      <Smoke />
      {/* <PortalOne /> */}
      {/* <PortalTwo /> */}
      <FinalePortal />
      {/* <TrainPortal /> */}
    </ViroARScene>
  );
}

module.exports = MainScene;

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});
