'use strict';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { foundObjectThunk } from '../store/objectState';
import {
  ViroText,
  ViroAmbientLight,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroNode
} from 'react-viro';
import Game from './TICTACTOE/TICTACTOE';

export const PortalTwo = () => {
  const standardPortalSize = [0.75, 1.5, 0.1]
  const zeroPortalSize = [0, 0, 0]

  const [ text, setText ] = useState('Solve the puzzle and find the key')
  const [ insidePortal, setInsidePortal ] = useState(false)
  const [ portalPosition, setPortalPosition ] = useState([1, -1, -2])
  const [ portalSize, setPortalSize] = useState(standardPortalSize)
  const [ portalVisible, setPortalVisible ] = useState(true)
  const [ keyFound, setKeyFound ] = useState(false)

  const _onClick = () => {
    setKeyFound(true)
    setText('You found the key! Exit to find the next portal!')
    setPortalPosition([-1, -1, -2])
    setPortalSize(standardPortalSize)
    setPortalVisible(true)
    // mona's thunk goes here?
  }

  const _onPortalEnter = () => {
    setInsidePortal(true)
    setPortalSize(zeroPortalSize)
  }

  const _onPortalExit = () => {
    setInsidePortal(false)
    setPortalVisible(false)
    setPortalSize(zeroPortalSize)
  }

  let levelComplete = keyFound && !insidePortal

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
      source={require('./res/FBXtoVRX/beach.vrx')}
      position={[0.3, 0, -1]}
      scale={[0.03, 0.03, 0.03]}
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
    <Viro3DObject
      source={require('./res/3dObjects/Key_B_02.obj')}
      resources={[
        require('./res/3dObjects/Key_B_02.mtl'),
        require('./res/3dObjects/keyB_tx.bmp'),
      ]}
      type="OBJ"
      position={[-1.5, -0.5, 2]}
      scale={[0.055, 0.055, 0.055]}
      onClick={_onClick}
      visible={!keyFound}
    />
    {/* <ViroNode
      <Game />
    </ViroNode> */}

  </ViroPortalScene>
  )

}

const mapDispatch = (dispatch) => {
  return {
    sendObjectsStatus: (status) => dispatch(foundObjectThunk(status)),
  };
};

module.exports = connect(null, mapDispatch)(PortalTwo);
