'use strict';

/*
TRAIN PORTAL - Currently deactivated final scene to the game. Load was too heavy to include seamlessly without game crashing. Currently there is a substitute image in place where 3D train platform object originally intended
*/

import React, { useState } from 'react';
import {
  ViroText,
  ViroAmbientLight,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
} from 'react-viro';

export const TrainPortal = () => {

  // standard rendering sizes for consistency
  const standardPortalSize = [0.75, 1.5, 0.1];
  const zeroSize = [0, 0, 0];

  // local game state for each level
  const [text, setText] = useState('');
  const [insidePortal, setInsidePortal] = useState(false);
  const [portalPosition, setPortalPosition] = useState([1, -1, -2]);
  const [portalSize, setPortalSize] = useState(standardPortalSize);
  const [trainSize, setTrainSize] = useState([0.009, 0.009, 0.009])
  const [portalVisible, setPortalVisible] = useState(true);

   // shrinks portal to zero to avoid issues while inside the portal
  const _onPortalEnter = () => {
    setInsidePortal(true);
    setPortalSize(zeroSize);
    setTimeout(() => {
      setTrainSize(zeroSize)
      setText('You Win!!! Thanks for playing!')},
      25000)
  };

  // this is not technically needed, as this is the end of the game. It has been left in to avoid other issues during testing.
  const _onPortalExit = () => {
    setInsidePortal(false);
    setPortalVisible(false);
    setPortalSize(zeroSize);
  };

  return (
    <ViroPortalScene
      passable={true}
      dragType="FixedDistance"
      onDrag={() => {}}
      onPortalEnter={_onPortalEnter}
      onPortalExit={_onPortalExit}
    >
      <ViroAmbientLight color="#ffffff" intensity={500} />
      <ViroPortal
        position={portalPosition}
        scale={portalSize}
        visible={portalVisible}
      >

        {/* 3D object is the FRAME of the portal */}
        <Viro3DObject
          source={require('./res/ARPortals/portal_res/door/portal_archway/portal_archway.vrx')}
          resources={[
            require('./res/ARPortals/portal_res/door/portal_archway/portal_archway_diffuse.png'),
            require('./res/ARPortals/portal_res/door/portal_archway/portal_archway_normal.png'),
            require('./res/ARPortals/portal_res/door/portal_archway/portal_archway_specular.png'),
            require('./res/ARPortals/portal_res/door/portal_archway/portal_entry.png'),
          ]}
          type="VRX"
          visible={portalVisible}
        />
      </ViroPortal>

      {/* 3D object is the room / environment inside the portal */}
      <Viro3DObject
        source={require('./res/FBXtoVRX/train.vrx')}
        position={[-1.75, -1.95, -.1]}
        scale={trainSize}
        type="VRX"
        visible={portalVisible}
      />
      <ViroText text={text} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />
    </ViroPortalScene>
  );
};

module.exports = TrainPortal;
