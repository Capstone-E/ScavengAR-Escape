'use strict'

import React from 'react';
import { useSelector } from 'react-redux';

import {View, StyleSheet, FlatList, TouchableHighlight, Image} from 'react-native'

import keyImage from './res/croppedKey.png';
import shadowKey from './res/blackNWhite.png';

const Inventory = () => {

  const objectFoundStatus = useSelector((state) => state.objectsStatus);

  return (
    <View style={style.outerContainer}>
      <FlatList
        horizontal={true}
        contentContainerStyle={style.listViewContainer}
        data={[
          { key: objectFoundStatus[0] ? 'One'  : 'Slot One Locked'},
          { key: objectFoundStatus[1] ? 'Two'  : 'Slot Two Locked'},
        ]}
        renderItem={({ item }) => (
          <TouchableHighlight style={style.buttons} underlayColor={'#68a0ff'}>
            <View style={{height: 70, width: 130}}>
              {
              (item.key[0] !== 'S') ?
                <Image style={style.image} source={keyImage} /> // changes to this image when key(s) is clicked/dragged
                :
                <Image style={style.image} source={shadowKey} /> // will show this image when key(s) is not yet found
              }       
            </View>

          </TouchableHighlight>
        )}
        keyExtractor={(item) => item.key.toString()} // for warning about key and string
        scrollEnabled={false}
      />
    </View>
  );
  
}

const style = StyleSheet.create({
  outerContainer: {
    flex: .1,
    height: 80,
    borderTopWidth: 0.5,
    borderColor: '#800000',
    backgroundColor: 'black',
  },
  listViewContainer: {
    flex: 1,
    height: 72,
    flexDirection: 'row',
    justifyContent: "space-around",
  },
  buttons: {
    height: 70,
    width: 'auto',
    paddingTop: 1,
    paddingBottom: 1,
    paddingLeft: 1,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'black',
    borderRadius: 20,
  },
  textStyle: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'white',
    alignSelf: 'center'
  },
  image: {
    height: 60, 
    width: 130, 
    paddingLeft: 3, 
    borderRadius: 15,
    margin: 'auto',
    borderWidth: 2,
    borderColor: '#800000'
  }
})

export default Inventory;
