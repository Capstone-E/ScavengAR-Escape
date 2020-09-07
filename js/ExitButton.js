import React from 'react'
import {useSelector, useDispatch} from 'react-redux'

import {Text, TouchableHighlight, View, StyleSheet} from 'react-native'

import {UNSET, setNavigator} from '../store/navigator'
import {REMOVE_PORTALS, setPortal} from '../store/portalNaivigator'

const ExitButton = () => {
  const dispatch = useDispatch()
  const navigator = useSelector((state) => state.navigator)

  const handleOnClick = () => {
    // sent setPortal false status because game was not won, we are just exiting and resetting portal status
    dispatch(setPortal(false, REMOVE_PORTALS))
    // unset to send user back to new game screen
    dispatch(setNavigator(UNSET))
  }

  if (navigator !== UNSET) {
    return (
      <View
        style={{
          flex: 1,
          position: 'absolute',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          top: '5%',
          right: 10,
          width: 80,
          height: 220
        }}
      >
        <View
          style={{
            flex: 0.45,
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            right: 0,
            top: 20,
            width: 80
          }}
        >
          <TouchableHighlight style={{...styles.openButton}} onPress={() => handleOnClick()} underlayColor="#00000000">
            <Text style={{color: 'white'}}>Exit</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  } else {
    return null
  }
}
const styles = StyleSheet.create({
  openButton: {
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 5,
    elevation: 2,
    height: 25
  }
})

export default ExitButton
