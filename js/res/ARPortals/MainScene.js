'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroSceneNavigator,
  ViroText,
  ViroScene,
  ViroARScene,
  ViroAmbientLight,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
  Viro3DObject,
  ViroImage,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroBox,
  ViroConstants,
  ViroOrbitCamera
} from 'react-viro'

// import HintButton from '../../HintButton';

var createReactClass = require('create-react-class');
export default class MainScene extends Component {
  constructor() {
    super();

    // initial state
    this.state = {
      text: 'find the key',
      portalPosition: [-20, -90, -300]
    }
    this._onInitialized = this._onInitialized.bind(this)
    this._onClick = this._onClick.bind(this)
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        {/* <HintButton /> */}
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {/* <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={'Horizontal'}> */}
        <ViroOrbitCamera position={[-1, -1, -1]} focalPoint={[0, 0, -1]} active={true} />
        <ViroPortalScene
        // position={[-20, -90, -300]}
        passable={true}
        // dragType="FixedToPlane"
        // onDrag={() => {}}
        anchorDetectionTypes={'PlanesHorizontal'}
        >
          <ViroPortal position={this.state.portalPosition} scale={[75, 150, 10]}>
            <Viro3DObject
              source={require('./portal_res/door/portal_archway/portal_archway.vrx')}
              resources={[
                require('./portal_res/door/portal_archway/portal_archway_diffuse.png'),
                require('./portal_res/door/portal_archway/portal_archway_normal.png'),
                require('./portal_res/door/portal_archway/portal_archway_specular.png'),
                require('./portal_res/door/portal_archway/portal_entry.png'),
              ]}
              type="VRX"
            />
          </ViroPortal>
          <Viro3DObject source={require('../FBXtoVRX/model.vrx')} type="VRX" />
          {/* <Viro3DObject
            source={require('../OBJ_CleaverKnife/CleaverKnife.obj')}
            resources={[
              require('../OBJ_CleaverKnife/CleaverKnife.mtl'),
              require('../OBJ_CleaverKnife/CleaverKnife_AO.png'),
              require('../OBJ_CleaverKnife/CleaverKnife_BaseColor.png'),
              require('../OBJ_CleaverKnife/CleaverKnife_Metalness.png'),
              require('../OBJ_CleaverKnife/CleaverKnife_Normal.png'),
              require('../OBJ_CleaverKnife/CleaverKnife_Roughness.png'),
            ]}
            type="OBJ"
          /> */}
          <ViroText
            text={this.state.text}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
          />
          <Viro3DObject
            source={require('../3dObjects/Key_B_02.obj')}
            resources={[
              require('../3dObjects/Key_B_02.mtl'),
              require('../3dObjects/keyB_tx.bmp'),
            ]}
            type="OBJ"
            scale={[0.1, 0.1, 0.1]}
            onClick={this._onClick}
          />
          <ViroBox
            position={[0, -0.5, -1]}
            scale={[0.3, 0.3, 0.1]}
            materials={['grid']}
          />
        </ViroPortalScene>

        {/* <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[0, -1, -1]} scale={[0.1, 0.1, 0.1]}>
            <Viro3DObject
              source={require('./portal_res/door/portal_archway/portal_archway.vrx')}
              resources={[
                require('./portal_res/door/portal_archway/portal_archway_diffuse.png'),
                require('./portal_res/door/portal_archway/portal_archway_normal.png'),
                require('./portal_res/door/portal_archway/portal_archway_specular.png'),
                require('./portal_res/door/portal_archway/portal_entry.png'),
              ]}
              type="VRX"
            />
          </ViroPortal>
          <Viro360Image source={require('../outside.jpg')} type="OBJ" scale={[0.01, 0.01, 0.01]} />
        </ViroPortalScene> */}

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Find the key!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        text: 'oopsie',
      });
    }
  }

  _onClick() {
    //remove key from view (unrender)
    this.setState({
      keyfound: true,
      text: 'You found the key'
    })
    //change inventory state
    //check box off todo list for hints
  }
}

module.exports = MainScene;
