'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroMaterials,
<<<<<<< HEAD
  ViroARPlaneSelector,
=======
  ViroARTrackingTargets,
  ViroARImageMarker
>>>>>>> 3d4047e8fad1ff4c9e23968cef5c4ddd2c3052c0
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {
  constructor() {
    super();

    // Set initial state here
    this.state = {
      text: 'Initializing AR...',
      displaySpoon: false
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
    this._onAnchorFound = this._onAnchorFound.bind(this);
  }

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />

        <ViroARImageMarker target={"targetSpoon"}
          onAnchorFound={this._onAnchorFound}>
          <ViroBox
            position={[0, -0.5, -1]}
            scale={[0.3, 0.3, 0.1]}
            materials={['grid']}
          />
        </ViroARImageMarker>

      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text: 'Find a metroCard!',
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      this.setState({
        text: 'oopsie'
      })
    }
  }

  _onAnchorFound() {
    this.setState({
      displaySpoon: true,
    })
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 30,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});
ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require('./res/grid_bg.jpg'),
  },
});

ViroARTrackingTargets.createTargets({
  "targetSpoon" : {
    source : require('./res/metrocard.png'),
    orientation : "Up",
    physicalWidth : 0.1 // real world width in meters
  },
});

module.exports = HelloWorldSceneAR;
