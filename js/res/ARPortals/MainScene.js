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
  ViroARPlane,
  ViroBox,
} from 'react-viro';

var createReactClass = require('create-react-class');
var MainScene = createReactClass({
  render: function () {
    return (
      <ViroARScene>
        {/* <ViroARPlane minHeight={0.5} minWidth={0.5} alignment={'Horizontal'}> */}
        <ViroAmbientLight color="#ffffff" intensity={200} />
        <ViroPortalScene
          passable={true}
          dragType="FixedDistance"
          onDrag={() => {}}
        >
          <ViroPortal position={[-1, -1, -1]} scale={[0.1, 0.1, 0.1]}>
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
            source={require('../dock.jpg')}
            // source={require('../NoteOne/tinker.obj')}
            // resources={[require('../NoteOne/obj.mtl')]}
            type="OBJ"
            scale={[0.01, 0.01, 0.01]}
          />
        </ViroPortalScene>
        <ViroAmbientLight color="#ffffff" intensity={200} />
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
        {/* </ViroARPlane> */}
      </ViroARScene>
    );
  },
});

module.exports = MainScene;
