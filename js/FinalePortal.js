'use strict'
import React, {useState} from 'react'

/*
FINALE - Final step in the game
*/

import {useDispatch} from 'react-redux'

import {ViroNode, ViroARTrackingTargets, ViroARImageMarker, ViroText, ViroSound} from 'react-viro'

export const FinalePortal = (props) => {
  const dispatch = useDispatch()
  const {setPortal, portalName} = props
  let wasDispatched = false

  // local game state
  const [text, setText] = useState('Find a Metrocard in real life, scan it with your phone to escape')

  // triggers when final action is complete
  const _onAnchorFound = () => {

    /// stops infinite re-render error
    if (wasDispatched === false) {
      wasDispatched = true
      dispatch(setPortal(true, portalName))
    }
  }

  return (
    <ViroNode>
      <ViroText text={text} scale={[0.8, 0.8, 0.8]} position={[0, 0, -2]} />

      {/* Establishes action after image recognition */}
      <ViroARImageMarker target={'targetMetrocard'} onAnchorFound={_onAnchorFound}>

      </ViroARImageMarker>
    </ViroNode>
  )
}

// declares targe for image recognition
ViroARTrackingTargets.createTargets({
  targetMetrocard: {
    source: require('./res/metrocard.png'),
    orientation: 'Up',
    physicalWidth: 0.1
  }
})

module.exports = FinalePortal
