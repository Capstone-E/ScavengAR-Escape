'use strict'

import React, {Component} from 'react'

import {StyleSheet} from 'react-native'

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
  ViroBox
} from 'react-viro'

import HintButton from '../../HintButton'

var createReactClass = require('create-react-class')
export default class MainScene extends Component {
  constructor() {
    super()

    // initial state
    this.state = {
      text: 'find the key'
    }
    this._onInitialized = this._onInitialized.bind(this)
    this._onClick = this._onClick.bind(this)
  }

  render() {
    return (
      <ViroARScene>
        {/* <HintButton /> */}
        <ViroAmbientLight color="#ffffff" intensity={200} />
        {/* <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={'Horizontal'}> */}
        {/* <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => {}}>
          <ViroPortal position={[0, -3, -3]} scale={[0.015, 0.015, 0.015]}>
            <Viro3DObject
              source={require('./portal_res/door/Props.obj')}
              resources={[
                require('./portal_res/door/Props.mtl'),
              ]}
              type="OBJ"
            />
          </ViroPortal>
          <Viro360Image
            source={require('../dock.jpg')}
            // source={require('../NoteOne/tinker.obj')}
            // resources={[require('../NoteOne/obj.mtl')]}
            type="OBJ"
            scale={[0.01, 0.01, 0.01]}
          />
          <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
        />
          <Viro3DObject
            source={require('../3dObjects/Key_B_02.obj')}
            resources={[require('../3dObjects/Key_B_02.mtl'), require('../3dObjects/keyB_tx.bmp')]}
            type="OBJ"
            scale={[0.1, 0.1, 0.1]}
            onClick={this._onClick}
          />
          <ViroBox position={[0, -0.5, -1]} scale={[0.3, 0.3, 0.1]} materials={['grid']} />
        </ViroPortalScene> */}
        {/* </ViroARPlane> */}
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={() => {}}>
          <ViroPortal position={[0, -3, -1]} scale={[0.01, 0.01, 0.01]}>
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
        </ViroPortalScene>

      </ViroARScene>
    )
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Find the key!'
      })
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        text: 'oopsie'
      })
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

module.exports = MainScene
