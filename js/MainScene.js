'use strict'
import React, {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {ViroMaterials, ViroARScene, ViroAmbientLight, ViroConstants, ViroSpotLight} from 'react-viro'
import {PORTAL_ONE, PORTAL_TWO, TRAIN_PORTAL, FINAL_PORTAL, REMOVE_PORTALS, setPortal} from '../store/portalNaivigator'
import {YOU_WIN, setNavigator} from '../store/navigator'

const Smoke = require('./SmokeEffect')
const PortalOne = require('./PortalOne')
const PortalTwo = require('./PortalTwo')
const FinalePortal = require('./FinalePortal')
const TrainPortal = require('./TrainPortal')

function MainScene() {
  const [text, setText] = useState('')
  const {portalOne, portalTwo, finalPortal, trainPortal, gameWon} = useSelector((state) => state.portalNav)
  const dispatch = useDispatch()

  // wrap dispatch in useEffect to stop infinite re-render error
  useEffect(
    () => {
      if (portalOne && portalTwo) {
        dispatch(setPortal(true, FINAL_PORTAL))
      }
    },
    [portalOne, portalTwo]
  )

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
    if (!gameWon) {
      if (portalOne === false) {
        return <PortalOne setPortal={setPortal} portalName={PORTAL_ONE} />
      } else if (portalOne && !portalTwo) {
        return <PortalTwo setPortal={setPortal} portalName={PORTAL_TWO} />
      } else if (finalPortal && !trainPortal) {
        // finalportal will turn train portal true so it can render next
        return <FinalePortal setPortal={setPortal} portalName={TRAIN_PORTAL} />
      } else if (trainPortal && !gameWon) {
        return <TrainPortal setPortal={setPortal} portalName={REMOVE_PORTALS} />
      }
    } else {
      dispatch(setNavigator(YOU_WIN))
      return null
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
