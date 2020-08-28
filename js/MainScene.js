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
      insidePortalOne: false,
      portalOnePosition: [0, -1, -2],
      portalOneSize: [0.75, 1.5, 0.1],
      keyOneFound: false,

      insidePortalTwo: false,
      portalTwoPosition: [2, -1, -2],
      portalTwoSize: [0, 0, 0],
      keyTwoFound: false,
    }
    this._onInitialized = this._onInitialized.bind(this)
    this._onClickPortalOne = this._onClickPortalOne.bind(this)
    this._onClickPortalTwo = this._onClickPortalTwo.bind(this)
    this._onCameraARHitTest = this._onCameraARHitTest.bind(this)
    this._onPortalOneEnter = this._onPortalOneEnter.bind(this)
    this._onPortalOneExit = this._onPortalOneExit.bind(this)
    this._onPortalTwoEnter = this._onPortalTwoEnter.bind(this)
    this._onPortalTwoExit = this._onPortalTwoExit.bind(this)
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
          shadowNearZ={0.1}
          shadowFarZ={5}
          shadowOpacity={0.9}
        />

        {/*/~~~~~/ PORTAL SCENE ONE /~~~~~/*/}

        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
          onPortalEnter={this._onPortalOneEnter}
          onPortalExit={this._onPortalOneExit}
        >
        <ViroAmbientLight color="#ffffff" intensity={500} />
          <ViroPortal
          position={this.state.portalOnePosition}
          scale={this.state.portalOneSize}>
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
            <Viro3DObject
              source={require('../3dObjects/Key_B_02.obj')}
              resources={[
                require('../3dObjects/Key_B_02.mtl'),
                require('../3dObjects/keyB_tx.bmp'),
              ]}
              type="OBJ"
              position={[-1.5, -0.5, 2]}
              scale={[0.055, 0.055, 0.055]}
              onClick={this._onClickPortalOne}
              visible={!this.state.keyOneFound}
            />
        </ViroPortalScene>

        {/*/~~~~~/ PORTAL SCENE TWO /~~~~~~/*/}

        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
          onPortalEnter={this._onPortalTwoEnter}
          onPortalExit={this._onPortalTwoExit}
        >
        <ViroAmbientLight color="#ffffff" intensity={500} />
          <ViroPortal
          position={this.state.portalTwoPosition}
          scale={this.state.portalTwoSize}>
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
            <Viro3DObject
              source={require('../3dObjects/Key_B_02.obj')}
              resources={[
                require('../3dObjects/Key_B_02.mtl'),
                require('../3dObjects/keyB_tx.bmp'),
              ]}
              type="OBJ"
              position={[-1.5, -0.5, 2]}
              scale={[0.055, 0.055, 0.055]}
              onClick={this._onClickPortalTwo}
              visible={!this.state.keyTwoFound}
            />
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

  _onCameraARHitTest(results) {}

  _onPortalOneEnter() {
    this.setState({
      insidePortalOne: true,
      portalOneSize: [0, 0, 0]
    });
  }

  _onPortalTwoEnter() {
    this.setState({
      insidePortalTwo: true,
      portalTwoSize: [0, 0, 0]
    });
  }

  _onPortalOneExit() {
    this.setState({
      insidePortalOne:false,
      portalOneSize: [0, 0, 0]
    });
  }

  _onPortalTwoExit() {
    this.setState({
      insidePortalTwo:false,
      portalTwoSize: [0, 0, 0]
    });
  }

  _onClickPortalOne() {
    this.setState({
      keyOneFound: true,
      text: 'You found the key, you can escape!',
      portalOneSize: [0.75, 1.5, 0.1]
    });
    this.props.sendObjectsStatus(true);
  }

  _onClickPortalTwo() {
    this.setState({
      keyTwoFound: true,
      text: 'You found the key, you can escape!',
      portalTwoSize: [0.75, 1.5, 0.1]
    });
    this.props.sendObjectsStatus(true);
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
