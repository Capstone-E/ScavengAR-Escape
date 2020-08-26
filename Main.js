/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  StatusBar,
} from 'react-native';
import { ViroARSceneNavigator } from 'react-viro';
import Inventory from './js/Inventory';
import { setGameState } from './store/gameState';
import HintButton from './js/HintButton';

const MainScene = require('./js/res/ARPortals/MainScene');

function Main() {
  const game = useSelector((state) => state.game);
  const dispatch = useDispatch();

  const toggleYesBtn = (gameState) => {
    dispatch(setGameState(!gameState));
  };
  const newGameScreen = () => {
    return (
      <View style={localStyles.outer}>
        <View style={localStyles.inner}>
          <Text style={localStyles.titleText}>Can you escape?</Text>
          <TouchableHighlight
            style={localStyles.buttons}
            onPress={() => {
              toggleYesBtn();
            }}
          >
            <Text style={localStyles.buttonText}>Yes</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  };

  if (game.gameState === false) {
    return newGameScreen();
  } else {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={false} /**Shows top bar for time, signal, etc */ />
        <ViroARSceneNavigator initialScene={{ scene: MainScene }} />
        <HintButton />
        <Inventory />
      </View>
    );
  }
}

export default Main;

const localStyles = StyleSheet.create({
  viroContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  outer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  inner: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  titleText: {
    paddingTop: 30,
    paddingBottom: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 25,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
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
    borderColor: '#fff',
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
    borderColor: '#fff',
  },
});
