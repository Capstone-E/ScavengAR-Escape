import React, {useState} from 'react'
import {Text, View, TouchableHighlight, ImageBackground} from 'react-native'
import {useDispatch} from 'react-redux'
import localStyles from './localStyles'
import {AR_NAVIGATOR, HOW_TO_PLAY, setNavigator} from '../store/navigator'

const image = require('./res/main_page.png')

const NewGameScreen = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const dispatch = useDispatch()

  // onLoad is used to make sure background image renders before any additional components
  const onLoad = () => {
    setImageLoaded(true)
  }

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
      {!imageLoaded && (
        <View style={{flex: 1}}>
          <Text style={{color: 'red', fontSize: 90, alignSelf: 'center'}}>...</Text>
        </View>
      )}
    </View>
  )
}

export default NewGameScreen
