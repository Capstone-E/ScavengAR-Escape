'use strict';
import React, { Component } from 'react';

import { connect } from 'react-redux';
import { foundObjectThunk } from '../store/objectState';
import {
  ViroMaterials,
  ViroARScene,
  ViroAmbientLight,
  ViroConstants,
  ViroSpotLight,
} from 'react-viro';

import PortalOne from './PortalOne'

export default class MainScene extends Component {
  constructor(props) {
    super(props);

    // initial state

    this.state = {
      text: '',
      visible: false,
    };

    this._onInitialized = this._onInitialized.bind(this);
    this._onCameraARHitTest = this._onCameraARHitTest.bind(this);

  }

  render() {

    return (
      <ViroARScene
        onTrackingUpdated={this._onInitialized}
        onCameraARHitTest={this._onCameraARHitTest}
      >
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
        <PortalOne />
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
        text: 'Oopsie! Something is wrong with your AR. Restart and try again',
      });
    }
  }

  _onCameraARHitTest(results) {}

}

const mapDispatch = (dispatch) => {
  return {
    sendObjectsStatus: (status) => dispatch(foundObjectThunk(status)),
  };
};

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

module.exports = connect(null, mapDispatch)(MainScene);
