/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {Component} from 'react'
import {Text, View, StyleSheet, TouchableHighlight, StatusBar} from 'react-native'
import {ViroARSceneNavigator} from 'react-viro'
import Inventory from './js/Inventory'

const InitialARScene = require('./js/HelloWorldSceneAR')

export default class ScavengARescape extends Component {
  constructor() {
    super()
    this.state = {
      gameState: false
    }
    this.newGameScreen = this.newGameScreen.bind(this)
  }

  render() {
    const gameState = this.state.gameState
    if (!gameState) {
      return this.newGameScreen()
    } else {
      return (
        <View style={{flex: 1}}>
          <StatusBar hidden={false} /**Shows top bar for time, signal, etc */ /> 
          <ViroARSceneNavigator initialScene={{scene: InitialARScene}} />
          <Inventory />
        </View>
      )
    }
  }

  newGameScreen() {
    const gameState = this.state.gameState
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>Can you escape?</Text>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => {
              this.setState({gameState: !gameState})
            }}
          >
            <Text style={localStyles.buttonText}>Yes</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

var localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20
  },
  buttons: {
    height: 80,
    width: 150,
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#800000',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  },
  exitButton: {
    height: 50,
    width: 100,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff'
  }
})

module.exports = ScavengARescape
