'use strict'
import React, {useState} from 'react'
import {ViroMaterials, ViroARScene, ViroAmbientLight, ViroConstants, ViroSpotLight} from 'react-viro'

const Smoke = require('./SmokeEffect')

function MainScene() {
  const [text, setText] = useState('')
  const [portalOne, setPortalOne] = useState({done: false})
  const [portalTwo, setPortalTwo] = useState({done: false})

  const _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Find the key!')
    } else if (state == ViroConstants.TRACKING_NONE) {
      setText('Oopsie! Something is wrong with your AR. Restart and try again')
    }
  }
  const _onCameraARHitTest = (results) => {}

  const handlePortals = () => {
    if (portalOne.done === false) {
      const PortalOne = require('./PortalOne')
      return <PortalOne setPortalOne={setPortalOne} />
    } else if (portalOne.done === true && portalTwo.done === false) {
      const PortalTwo = require('./PortalTwo')
      return <PortalTwo setPortalTwo={setPortalTwo} />
    } else if (portalOne.done && portalTwo.done) {
      const FinalePortal = require('./FinalePortal')
      return <FinalePortal />
    }
  }

  return (
    <ViroARScene onTrackingUpdated={_onInitialized} onCameraARHitTest={_onCameraARHitTest}>
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
      {handlePortals()}
    </ViroARScene>
  )
}

module.exports = MainScene

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg')
  }
})
