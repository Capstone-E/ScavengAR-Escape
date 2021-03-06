'use strict'

/*
PORTAL TWO - Second step in the game, its completiion leads to FINALE
*/

import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {foundKeyTwo} from '../store/objectState'
import {ViroText, ViroAmbientLight, ViroPortal, ViroPortalScene, Viro3DObject, ViroNode, ViroSound} from 'react-viro'

export const PortalTwo = (props) => {
  const {setPortal, portalName} = props

  // standard rendering sizes for consistency
  const standardPortalSize = [0.75, 1.5, 0.1]
  const zeroSize = [0, 0, 0]

  // local game state for each level
  const [text, setText] = useState('Find the key')
  const [insidePortal, setInsidePortal] = useState(false)
  const [portalPosition, setPortalPosition] = useState([1, -1, -2])
  const [portalSize, setPortalSize] = useState(standardPortalSize)
  const [portalVisible, setPortalVisible] = useState(true)
  const [beachSize, setBeachSize] = useState([0.015, 0.015, 0.015])
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
    dispatch(foundKeyTwo(true)) // updates state in the redux store
  }

  // shrinks portal to zero to avoid issues while inside the portal
  const _onPortalEnter = () => {
    setInsidePortal(true)
    setPortalSize(zeroSize)
  }

  // disables this portal in order to enable Finale
  const _onPortalExit = () => {
    setInsidePortal(false)
    setPortalVisible(false)
    setPortalSize(zeroSize)
    setBeachSize(zeroSize)
  }

  // necessary for triggering Finale to render
  let levelComplete = keyFound && !insidePortal

  // when the level is complete update
  if (levelComplete) {
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
          source={require('./res/FBXtoVRX/beach.vrx')}
          position={[0.5, -1.8, -1]}
          scale={beachSize}
          type="VRX"
          visible={portalVisible}
        />

        <ViroText text={text} scale={[0.1, 0.1, 0.1]} position={[0.3, 1, -2]} />

        {/* 3D object is interactable key inside portal */}
        <Viro3DObject
          source={require('./res/3dObjects/Key_B_02.obj')}
          resources={[require('./res/3dObjects/Key_B_02.mtl'), require('./res/3dObjects/keyB_tx.bmp')]}
          type="OBJ"
          position={[1, -0.1, -0.3]}
          scale={[0.015, 0.015, 0.015]}
          onClick={_onClick}
          visible={!keyFound}
        />
        {/* Sound effect for when key is dragged and exit portal appears */}
        {objectFoundStatus.keyTwo && (
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

module.exports = PortalTwo
