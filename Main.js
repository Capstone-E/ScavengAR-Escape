/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import {useSelector} from 'react-redux'
import {View, StatusBar} from 'react-native'
import {ViroARSceneNavigator} from 'react-viro'
import Inventory from './js/Inventory'
import HintButton from './js/HintButton'
import {AR_NAVIGATOR, UNSET, HOW_TO_PLAY} from './store/navigator'
import NewGameScreen from './js/NewGameScreen'
import HowToPlayScreen from './js/HowToPlayScreen'

const MainScene = require('./js/MainScene')

function Main() {
  const navigator = useSelector((state) => state.navigator)

  // Check nagivation state and render approprate components
  // Options include => ("UNSET", "AR_NAVIGATION", "HOW_TO_PLAY")
  if (navigator === UNSET) {
    return <NewGameScreen />
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
    return <HowToPlayScreen />
  }
}

export default Main
