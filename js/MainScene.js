'use strict'
import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ViroMaterials, ViroARScene, ViroAmbientLight, ViroConstants, ViroSpotLight} from 'react-viro'
import {PORTAL_ONE, PORTAL_TWO, TRAIN_PORTAL, FINAL_PORTAL, setPortal} from '../store/portalNaivigator'
import {TrainPortal} from './TrainPortal'

const Smoke = require('./SmokeEffect')
const PortalOne = require('./PortalOne')
const PortalTwo = require('./PortalTwo')
const FinalePortal = require('./FinalePortal')

function MainScene() {
  const [text, setText] = useState('')
  const portals = useSelector((state) => state.portalNav)
  const {portalOne, portalTwo, finalPortal, trainPortal} = portals
  const dispatch = useDispatch()

  if (portalOne && portalTwo) {
    dispatch(setPortal(true, FINAL_PORTAL))
  }

  const _onInitialized = (state, reason) => {
    if (state == ViroConstants.TRACKING_NORMAL) {
      setText('Find the key!')
    } else if (state == ViroConstants.TRACKING_NONE) {
      setText('Oopsie! Something is wrong with your AR. Restart and try again')
    }
  }
  const _onCameraARHitTest = (results) => {}

  // function to conditionally render portals
  const handlePortals = () => {
    if (portalOne === false) {
      return <PortalOne setPortal={setPortal} portalName={PORTAL_ONE} />
    } else if (portalOne && !portalTwo) {
      return <PortalTwo setPortal={setPortal} portalName={PORTAL_TWO} />
    } else if (finalPortal && !trainPortal) {
      // finalportal will turn train portal true so it can render
      return <FinalePortal setPortal={setPortal} portalName={TRAIN_PORTAL} />
    } else if (trainPortal) {
      return <TrainPortal />
    } else return null
  }

  console.log('portalOne, portalTwo, finalPortal, trainPortal', portalOne, portalTwo, finalPortal, trainPortal)
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
      {/* call handle portals to render the correct portal based on state */}
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
