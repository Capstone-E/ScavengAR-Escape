'use strict';
import React, { useState } from 'react';
import {
  ViroText,
  ViroAmbientLight,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
} from 'react-viro';

export const TrainPortal = () => {
  const standardPortalSize = [0.75, 1.5, 0.1]
  const zeroPortalSize = [0, 0, 0]

  const [ text, setText ] = useState('Solve the puzzle and find the key')
  const [ insidePortal, setInsidePortal ] = useState(false)
  const [ portalPosition, setPortalPosition ] = useState([1, -1, -2])
  const [ portalSize, setPortalSize ] = useState(standardPortalSize)
  const [ portalVisible, setPortalVisible ] = useState(true)

  const _onPortalEnter = () => {
    setInsidePortal(true)
    setPortalSize(zeroPortalSize)
  }

  const _onPortalExit = () => {
    setInsidePortal(false)
    setPortalVisible(false)
    setPortalSize(zeroPortalSize)
  }

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
          // onLoadStart={}
          // onLoadEnd={}
        />
      </ViroPortal>
    {/* object for the room */}
      <Viro3DObject
        source={require('./res/FBXtoVRX/model.vrx')}
        // position={[0.5, -1.8, -1]}
        // scale={[0.015, 0.015, 0.015]}
        type="VRX"
        visible={portalVisible}
        // onLoadStart={}
        // onLoadEnd={}
      />
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 1, -2]}
      />

    </ViroPortalScene>
  )
}

module.exports = TrainPortal;
