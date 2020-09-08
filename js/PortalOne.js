'use strict'

/*
PORTAL ONE - First step in the game, it's completiion leads to PORTAL TWO
*/

import React, {useState} from 'react'
import {foundKeyOne} from '../store/objectState'
import {useSelector, useDispatch} from 'react-redux'

import {ViroText, ViroAmbientLight, ViroPortal, ViroPortalScene, Viro3DObject, ViroNode, ViroSound} from 'react-viro'

export const PortalOne = (props) => {
  // standard rendering sizes for consistency
  const standardPortalSize = [0.75, 1.5, 0.1]
  const zeroSize = [0, 0, 0]

  // local game state for each level
  const [text, setText] = useState('Solve the puzzle and find the key')
  const [insidePortal, setInsidePortal] = useState(false)
  const [portalPosition, setPortalPosition] = useState([0, -1, -2])
  const [portalSize, setPortalSize] = useState(standardPortalSize)
  const [portalVisible, setPortalVisible] = useState(true)
  const [campSize, setCampSize] = useState([0.015, 0.015, 0.015])
  const [keyFound, setKeyFound] = useState(false)

  // retrieves key's found status (state)
  const objectFoundStatus = useSelector((state) => state.objectsStatus)
  const dispatch = useDispatch()

  //action that occurs after key is collected
  const _onClick = () => {
    setKeyFound(true)
    setText('You found the key! Exit to find the next portal!')
    setPortalPosition([0.3, -1, -1.8])
    setPortalSize(standardPortalSize)
    setPortalVisible(true)
    dispatch(foundKeyOne(true)) // updates state in the redux store
  }

  // shrinks portal to zero to avoid issues while inside the portal
  const _onPortalEnter = () => {
    setInsidePortal(true)
    setPortalSize(zeroSize)
  }

  // disables this portal in order to enable Portal Two
  const _onPortalExit = () => {
    setInsidePortal(false)
    setPortalVisible(false)
    setPortalSize(zeroSize)
    setCampSize(zeroSize)
  }

  const {setPortal, portalName} = props
  // necessary for triggering Portal Two to render
  // when the level is complete update portal status to true
  if (keyFound && !insidePortal) {
    dispatch(setPortal(true, portalName))
  }

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
        <ViroPortal position={portalPosition} scale={portalSize} visible={portalVisible}>
          {/* 3D object is the FRAME of the portal */}
          <Viro3DObject
            source={require('./res/ARPortals/portal_res/door/portal_archway/portal_archway.vrx')}
            resources={[
              require('./res/ARPortals/portal_res/door/portal_archway/portal_archway_diffuse.png'),
              require('./res/ARPortals/portal_res/door/portal_archway/portal_archway_normal.png'),
              require('./res/ARPortals/portal_res/door/portal_archway/portal_archway_specular.png'),
              require('./res/ARPortals/portal_res/door/portal_archway/portal_entry.png')
            ]}
            type="VRX"
            visible={portalVisible}
          />
        </ViroPortal>

        {/* 3D object is the room / environment inside the portal */}
        <Viro3DObject
          source={require('./res/FBXtoVRX/camping.vrx')}
          position={[0.3, -1.05, -1]}
          scale={[0.015, 0.015, 0.015]}
          type="VRX"
          visible={portalVisible}
        />

        <ViroText text={text} scale={[0.1, 0.1, 0.1]} position={[0.3, 0, -1.5]} />

        {/* 3D object is interactable key inside portal */}
        <Viro3DObject
          source={require('./res/3dObjects/Key_B_02.obj')}
          resources={[require('./res/3dObjects/Key_B_02.mtl'), require('./res/3dObjects/keyB_tx.bmp')]}
          type="OBJ"
          position={[-1.1, 0.1, 0.2]}
          scale={[0.015, 0.015, 0.015]}
          onClick={_onClick}
          visible={!keyFound}
        />
        {/* Sound effect for when key is dragged and exit portal appears */}
        {objectFoundStatus.keyOne && (
          <ViroSound
            source={require('./res/sound/unlock.wav')}
            volume={1.0}
            paused={false}
            muted={false}
            loop={false}
          />
        )}
      </ViroPortalScene>
    </ViroNode>
  )
}

module.exports = PortalOne
