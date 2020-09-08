'use strict'

/*
TRAIN PORTAL - GAME END
*/

import React, {useState} from 'react'
import {ViroText, ViroAmbientLight, ViroPortal, ViroPortalScene, Viro3DObject, ViroSound, ViroNode} from 'react-viro'
import {useDispatch} from 'react-redux'

export const TrainPortal = (props) => {
  // standard rendering sizes for consistency
  const standardPortalSize = [0.75, 1.5, 0.1]
  const zeroPortalSize = [0, 0, 0]

  // local game state for each level
  const [text, setText] = useState('Solve the puzzle and find the key')
  const [insidePortal, setInsidePortal] = useState(false)
  const [portalPosition, setPortalPosition] = useState([1, -1, -2])
  const [portalSize, setPortalSize] = useState(standardPortalSize)
  const [trainSize, setTrainSize] = useState([0.009, 0.009, 0.009])
  const [portalVisible, setPortalVisible] = useState(true)
  const [playSound, setPlaySound] = useState(false)
  const dispatch = useDispatch()
  const {setPortal, portalName} = props


  // Plays final sound clip and exits game after 10 seconds
  const _onPortalEnter = () => {
    setPlaySound(true)
    setTimeout(() => {
      dispatch(setPortal(true, portalName))
    }, 10000)
  }

  return (
    <ViroNode>
      <ViroPortalScene
      passable={true}
      dragType="FixedDistance"
      onDrag={() => {}}
      onPortalEnter={_onPortalEnter}
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
        source={require('./res/FBXtoVRX/train.vrx')}
        position={[-1.75, -1.95, -0.1]}
        scale={trainSize}
        type="VRX"
        visible={portalVisible}
      />
      <ViroText text={text} scale={[0.5, 0.5, 0.5]} position={[0, 0, 0]} />
    </ViroPortalScene>
      {playSound && <ViroSound source={require('./res/sound/you-win.wav')} volume={1.0} paused={false} muted={false} loop={false} />}
    </ViroNode>
  )
}

module.exports = TrainPortal
