'use strict';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { foundObjectThunk } from '../store/objectState';
import {
  ViroText,
  ViroAmbientLight,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroNode,
  ViroARTrackingTargets,
  ViroARImageMarker,
} from 'react-viro';

export const FinalePortal = () => {
  const standardPortalSize = [0.75, 1.5, 0.1]
  const zeroPortalSize = [0, 0, 0]

  const [ text, setText ] = useState('Click the train to leave')
  const [ insidePortal, setInsidePortal ] = useState(false)
  const [ portalPosition, setPortalPosition ] = useState([1, -1, -2])
  const [ portalSize, setPortalSize ] = useState(zeroPortalSize)
  const [ portalVisible, setPortalVisible ] = useState(true)
  const [ keyFound, setKeyFound ] = useState(false)

  const objectFoundStatus = useSelector((state) => state.objectsStatus);
  const dispatch = useDispatch();

  const _onClick = () => {
    setText('Congratulations! You have escaped! Now get out of here!!!')
    setPortalPosition([-1, -1, -2])
    setPortalSize(standardPortalSize)
    setPortalVisible(true)
  }

  const _onAnchorFound = () => {
    setPortalSize(standardPortalSize)
  }

  const _onPortalEnter = () => {
    setInsidePortal(true)
    setPortalSize(zeroPortalSize)
  }

  const _onPortalExit = () => {
    setInsidePortal(false)
    setPortalVisible(false)
    setPortalSize(zeroPortalSize)
    // something that resets the game here
  }

  return (
    <ViroNode>
      <ViroARImageMarker
        target={'targetMetrocard'}
        onAnchorFound={_onAnchorFound}
      >
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
            position={[0.5, -1.8, -1]}
            scale={[0.015, 0.015, 0.015]}
            type="VRX"
            visible={portalVisible}
            _onClick={_onClick}
            // onLoadStart={}
            // onLoadEnd={}
          />

          <ViroText
            text={text}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 1, -2]}
          />

        </ViroPortalScene>
      </ViroARImageMarker>
    </ViroNode>
  )

}

ViroARTrackingTargets.createTargets({
  targetMetrocard: {
    source: require('./res/metrocard.png'),
    orientation: 'Up',
    physicalWidth: 0.1,
  },
});

module.exports = FinalePortal;
