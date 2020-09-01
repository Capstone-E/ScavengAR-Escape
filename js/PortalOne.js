'use strict';
import React, { useState } from 'react';
import { foundObjectThunk } from '../store/objectState';
import { useSelector, useDispatch } from 'react-redux';

import {
  ViroText,
  ViroAmbientLight,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroNode,
  ViroSound
} from 'react-viro';
import Game from './TICTACTOE/TICTACTOE';
import PortalTwo from './PortalTwo';

export const PortalOne = () => {
  const standardPortalSize = [0.75, 1.5, 0.1]
  const zeroPortalSize = [0, 0, 0]

  const [ text, setText ] = useState('Solve the puzzle and find the key')
  const [ insidePortal, setInsidePortal ] = useState(false)
  const [ portalPosition, setPortalPosition ] = useState([0, -1, -2])
  const [ portalSize, setPortalSize ] = useState(standardPortalSize)
  const [ portalVisible, setPortalVisible ] = useState(true)
  const [ keyFound, setKeyFound ] = useState(false)

  const objectFoundStatus = useSelector((state) => state.objectsStatus);
  const dispatch = useDispatch();

  const _onClick = () => {
    setKeyFound(true)
    setText('You found the key! Exit to find the next portal!')
    setPortalPosition([0, -1, -1.8])
    setPortalSize(standardPortalSize)
    setPortalVisible(true)
    dispatch(foundObjectThunk(true)) // for inv.

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
    <ViroNode>
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
            source={require('./res/FBXtoVRX/camping.vrx')}
            position={[0.3, -1.35, -1]}
            scale={[0.015, 0.015, 0.015]}
            type="VRX"
            visible={portalVisible}
            // onLoadStart={}
            // onLoadEnd={}
          />

          <ViroText
            text={text}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1.5]}
          />
          <Viro3DObject
            source={require('./res/3dObjects/Key_B_02.obj')}
            resources={[
              require('./res/3dObjects/Key_B_02.mtl'),
              require('./res/3dObjects/keyB_tx.bmp'),
            ]}
            type="OBJ"
            position={[-1.1, 0.1, 0.2]}
            scale={[0.015, 0.015, 0.015]}
            onClick={_onClick}
            visible={!keyFound}
          />
          {objectFoundStatus[0] && <ViroSound
            source={require("./res/sound/unlock.wav")}
            volume={1.0}
            paused={false}
            muted={false}
            loop={false}
          />}
          {/* <ViroNode
            <Game />
          </ViroNode> */}
        </ViroPortalScene>

        {levelComplete && <PortalTwo />}
    </ViroNode>
  )

}


module.exports = PortalOne;
