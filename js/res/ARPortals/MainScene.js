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
} from 'react-viro';

// import HintButton from '../../HintButton';

var createReactClass = require('create-react-class');
export default class MainScene extends Component {
  constructor() {
    super();

    // initial state
    this.state = {
      text: '',
    };
    this._onInitialized = this._onInitialized.bind(this);
    this._onClick = this._onClick.bind(this);
  }

  render() {
    return (
      <ViroARScene>
        {/* <HintButton /> */}
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[0, 0, 5]} scale={[0.1, 0.1, 0.1]}>
            <Viro3DObject
              source={require('./portal_res/portal_ship/portal_ship.vrx')}
              resources={[
                require('./portal_res/portal_ship/portal_ship_diffuse.png'),
                require('./portal_res/portal_ship/portal_ship_normal.png'),
                require('./portal_res/portal_ship/portal_ship_specular.png'),
              ]}
              type="VRX"
              physicsBody={{
                type: 'Kinematic',
                userGravity: true,
              }}
            />
          </ViroPortal>
          <Viro360Image source={require('../snowscape.jpg')} />
          <Viro3DObject
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
          />
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

        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[0, -1, -1]} scale={[0.1, 0.1, 0.1]}>
            <Viro3DObject
              source={require('./portal_res/portal_ship/portal_ship.vrx')}
              resources={[
                require('./portal_res/portal_ship/portal_ship_diffuse.png'),
                require('./portal_res/portal_ship/portal_ship_normal.png'),
                require('./portal_res/portal_ship/portal_ship_specular.png'),
              ]}
              type="VRX"
              physicsBody={{
                type: 'Kinematic',
                userGravity: true,
              }}
            />
          </ViroPortal>
          <Viro360Image
            source={require('../outside.jpg')}
            type="OBJ"
            scale={[0.01, 0.01, 0.01]}
          />
        </ViroPortalScene>
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
    this.setState({
      text: 'You found the key',
    });
  }
}

module.exports = MainScene;
