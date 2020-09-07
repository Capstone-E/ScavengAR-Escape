/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, {useState} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {Text, View, StyleSheet, TouchableHighlight, StatusBar, ImageBackground} from 'react-native'
import {ViroARSceneNavigator} from 'react-viro'
import Inventory from './js/Inventory'
import HintButton from './js/HintButton'
import {AR_NAVIGATOR, UNSET, HOW_TO_PLAY, setNavigator} from './store/navigator'

const MainScene = require('./js/MainScene')
const image = require('./js/res/train.png')

function Main() {
  const [imageLoaded, setImageLoaded] = useState(false)
  const navigator = useSelector((state) => state.navigator)
  const dispatch = useDispatch()

  const newGameScreen = () => {
    return (
      <View style={localStyles.outer}>
        <ImageBackground source={image} style={localStyles.image} onLoad={onLoad} />
        {imageLoaded && (
          <View style={localStyles.inner}>
            <Text style={localStyles.titleText}>Welcome to ScavengARescape</Text>
            <Text style={localStyles.titleText}>Can you escape?</Text>

            {/* Clicking "Yes" button will begin game */}
            <TouchableHighlight style={localStyles.buttons} onPress={() => dispatch(setNavigator(AR_NAVIGATOR))}>
              <Text style={localStyles.buttonText}>Yes</Text>
            </TouchableHighlight>

            {/* Clicking "How To Play" will show users game instructions */}
            <TouchableHighlight style={localStyles.buttons} onPress={() => dispatch(setNavigator(HOW_TO_PLAY))}>
              <Text style={localStyles.buttonText}>How To Play</Text>
            </TouchableHighlight>
          </View>
        )}
        {!imageLoaded && <Text style={{color: 'red', fontSize: 90}}>...</Text>}
      </View>
    )
  }

  const howToPlayScreen = () => {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>
            1. Start With Back Against A Wall Or With Plenty Room In Front Of Camera
          </Text>
          <Text style={localStyles.titleText}>2. Pan Camera Slowly</Text>
          <Text style={localStyles.titleText}>3. Enter Portals To Complete Puzzles And Find Keys</Text>
          <Text style={localStyles.titleText}>4. Click Keys To Exit Portal</Text>
          <Text style={localStyles.titleText}>5. Find All Keys Or Complete All Puzzles To Win The Game</Text>

          {/* Back button takes users back to New Game screen */}
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => {
              dispatch(setNavigator(UNSET))
            }}
          >
            <Text style={localStyles.buttonText}>Back</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }

  // onLoad is used to make sure background image renders before any additional components
  const onLoad = () => {
    setImageLoaded(true)
  }

  // Check nagivation state and render approprate components
  // Options include => ("UNSET", "AR_NAVIGATION", "HOW_TO_PLAY")
  if (navigator === UNSET) {
    return newGameScreen()
  } else if (navigator === AR_NAVIGATOR) {
    return (
      <View style={{flex: 1}}>
        <StatusBar hidden={false} />
        <ViroARSceneNavigator initialScene={{scene: MainScene}} />
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
    justifyContent: 'center'
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
  image: {
    position: 'absolute',
    top: 15,
    left: 0,
    right: 0,
    bottom: 0,
    width: null,
    height: '58%'
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
