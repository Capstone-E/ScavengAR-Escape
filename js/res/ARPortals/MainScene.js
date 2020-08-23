'use strict';

import React, { Component } from 'react';

import { StyleSheet } from 'react-native';

import {
  ViroSceneNavigator,
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
} from 'react-viro';

var createReactClass = require('create-react-class');
var MainScene = createReactClass({
  render: function () {
    return (
      <ViroARScene>
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroPortalScene
          passable={true}
          dragType="FixedToWorld"
          // onDrag={() => {}}
        >
          <ViroPortal position={[0, 0, -1]} scale={[0.05, 0.05, 0.05]}>
            <Viro3DObject
              source={require('./portal_res/portal_ship/portal_ship.vrx')}
              resources={[
                require('./portal_res/portal_ship/portal_ship_diffuse.png'),
                require('./portal_res/portal_ship/portal_ship_normal.png'),
                require('./portal_res/portal_ship/portal_ship_specular.png'),
              ]}
              type="VRX"
            />
          </ViroPortal>
          <ViroImage
            height={0.5}
            width={0.5}
            source={require('./portal_res/note.png')}
            orientation="center"
          />
        </ViroPortalScene>
      </ViroARScene>
    );
  },
});

module.exports = MainScene;
