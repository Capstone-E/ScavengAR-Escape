import React, {useState} from 'react'
import {Text, View, TouchableHighlight, ImageBackground} from 'react-native'
import {useDispatch} from 'react-redux'
import localStyles from './localStyles'
import {UNSET, setNavigator} from '../store/navigator'

const image = require('./res/main_page.png')

const HowToPlayScreen = () => {
  const [imageLoaded, setImageLoaded] = useState(false)
  const dispatch = useDispatch()

  // onLoad is used to make sure background image renders before any additional components
  const onLoad = () => {
    setImageLoaded(false)
  }

  return (
    <View style={localStyles.outer}>
      <ImageBackground source={image} style={localStyles.image} onLoad={onLoad} />
      {imageLoaded && (
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
      )}
      {!imageLoaded && (
        <View style={{flex: 1}}>
          <Text style={{color: 'red', fontSize: 90, alignSelf: 'center'}}>...</Text>
        </View>
      )}
    </View>
  )
}

export default HowToPlayScreen
