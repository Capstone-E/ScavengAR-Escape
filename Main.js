/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {useState} from 'react'
import {Text, View, StyleSheet, TouchableHighlight, StatusBar} from 'react-native'
import {ViroARSceneNavigator} from 'react-viro'
import Inventory from './js/Inventory'
import HintButton from './js/HintButton'

const MainScene = require('./js/MainScene')
const AR_NAVIGATOR = 'AR_NAVIGATOR'
const HOW_TO_PLAY = 'HOW_TO_PLAY'
const UNSET = 'UNSET'

function Main() {
  const [navigator, setNavigator] = useState(UNSET)

  const newGameScreen = () => {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>Can you escape?</Text>
          <TouchableHighlight style={localStyles.buttons} onPress={() => setNavigator(AR_NAVIGATOR)}>
            <Text style={localStyles.buttonText}>Yes</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons} onPress={() => setNavigator(HOW_TO_PLAY)}>
            <Text style={localStyles.buttonText}>How To Play</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  const howToPlayScreen = () => {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>1. Move Device Slowly To Find Portal</Text>
          <Text style={localStyles.titleText}>2. Enter Portals To Complete Puzzles</Text>
          <Text style={localStyles.titleText}>3. Escape</Text>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => {
              setNavigator(UNSET)
            }}
          >
            <Text style={localStyles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  const exitGame = () => setNavigator(UNSET)

  if (navigator === UNSET) {
    return newGameScreen()
  } else if (navigator === AR_NAVIGATOR) {
    return (
      <View style={{poisiton: 'absolute', flex: 1}}>
        <StatusBar hidden={false} />
        <ViroARSceneNavigator initialScene={{scene: MainScene}} viroAppProps={exitGame} />
        <HintButton />
        <Inventory />
      </View>
    )
  } else if (navigator === HOW_TO_PLAY) {
    return howToPlayScreen()
  }
}

export default Main

const localStyles = StyleSheet.create({
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
