'use strict'
import React, {Component} from 'react'

import {StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {foundObjectThunk} from '../store/objectState'
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
  ViroNode,
  ViroImage,
  ViroARPlaneSelector,
  ViroARPlane,
  ViroBox,
  ViroConstants,
  ViroSpotLight
} from 'react-viro'

export default class MainScene extends Component {
  constructor() {
    super()

    // initial state
    this.state = {
      text: 'find the key',
      insidePortal: false,
      portalPosition: [0, -1, -2],
      portalSize: [0.75, 1.5, 0.1]
    }
    this._onInitialized = this._onInitialized.bind(this)
    this._onClick = this._onClick.bind(this)
    this._onCameraARHitTest = this._onCameraARHitTest.bind(this)
    this._onPortalEnter = this._onPortalEnter.bind(this)
    this._onPortalExit = this._onPortalExit.bind(this)
  }

  render() {
    // console.log('state', this.state)
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} onCameraARHitTest={this._onCameraARHitTest}>
        <ViroAmbientLight color="#ffffff" intensity={500} />
        <ViroSpotLight
          innerAngle={5}
          outerAngle={20}
          direction={[0, -1, -0.2]}
          position={[0, 5, 1]}
          color="#ffffff"
          castsShadow={true}
          // influenceBitMask={this.props.bitMask}
          shadowNearZ={0.1}
          shadowFarZ={5}
          shadowOpacity={0.9}
        />
        {/* <ViroText
            text={this.state.points}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, -1]}
          /> */}
        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
          onPortalEnter={this._onPortalEnter}
          onPortalExit={this._onPortalExit}
        >
          <ViroAmbientLight color="#ffffff" intensity={500} />
          <ViroPortal position={this.state.portalPosition} scale={this.state.portalSize}>
            <Viro3DObject
              source={require('./portal_res/door/portal_archway/portal_archway.vrx')}
              resources={[
                require('./portal_res/door/portal_archway/portal_archway_diffuse.png'),
                require('./portal_res/door/portal_archway/portal_archway_normal.png'),
                require('./portal_res/door/portal_archway/portal_archway_specular.png'),
                require('./portal_res/door/portal_archway/portal_entry.png')
              ]}
              type="VRX"
            />
          </ViroPortal>
          <Viro3DObject source={require('../FBXtoVRX/model.vrx')} type="VRX" />

          <ViroText text={this.state.text} scale={[0.5, 0.5, 0.5]} position={[0, 1, -2]} />
          {/* <ViroNode
            position={[-1, -1.2, -2]} >  */}
          {/*This is for making the key appear at the portal for easier clickabliltiy/drag for testing inv.*/}
          <Viro3DObject
            source={require('../3dObjects/Key_B_02.obj')}
            resources={[require('../3dObjects/Key_B_02.mtl'), require('../3dObjects/keyB_tx.bmp')]}
            type="OBJ"
            position={[-1.5, -0.5, 2]}
            scale={[0.055, 0.055, 0.055]}
            onClick={this._onClick}
            visible={!this.state.keyfound}
          />
          {/* </ViroNode> */}
          {/* <ViroBox
            position={[0, -0.5, -1]}
            scale={[0.3, 0.3, 0.1]}
            materials={['grid']}
          /> */}
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
          <Viro360Image
            source={require('../outside.jpg')}
            type="OBJ"
            scale={[0.01, 0.01, 0.01]}
          />
        </ViroPortalScene> */}
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

  _onCameraARHitTest(results) {}

  _onPortalEnter() {
    this.setState({
      insidePortal: true,
      portalSize: [0, 0, 0]
    })
  }

  _onPortalExit() {
    this.setState({
      insidePortal: false,
      portalPosition: [0, 0, -2]
    })
  }

  _onClick() {
    this.setState({
      keyfound: true,
      text: 'You found the key, you can escape!',
      portalSize: [0.75, 1.5, 0.1]
    })
    this.props.sendObjectsStatus(true)
  }
}

const mapDispatch = (dispatch) => {
  return {
    sendObjectsStatus: (status) => dispatch(foundObjectThunk(status))
  }
}

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg')
  }
})

module.exports = connect(null, mapDispatch)(MainScene)
