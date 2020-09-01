'use strict';

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';

import keyImage from './res/keyImage.png';

const Inventory = () => {

  const objectFoundStatus = useSelector((state) => state.objectsStatus);

  return (
    <View style={style.outerContainer}>
      <FlatList
        horizontal={true}
        contentContainerStyle={style.listViewContainer}
        data={[
          { key: objectFoundStatus[0] ? keyImage : 'Slot One Locked' },
          { key: objectFoundStatus[1] ? keyImage : 'Slot Two Locked' },
          // { key: objectFoundStatus[2] ? keyImage : 'Slot Three Locked' },
          // { key: objectFoundStatus[3] ? keyImage : 'Slot Four Locked' },
          // { key: objectFoundStatus[4] ? keyImage : 'Slot Five Locked' },

        ]}
        renderItem={({ item }) => (
          <TouchableHighlight style={style.buttons} underlayColor={'#68a0ff'}>
            <View style={{height: 50, width: 60}}>
              {(item.key[0] !== 'S') ?
                <Image style={{height: 50, width: 50, paddingLeft: 3, borderRadius: 5}} source={item.key} />
                :
                <Text style={style.textStyle}>{item.key}</Text>
              }
            </View>
          </TouchableHighlight>
        )}
        keyExtractor={(item) => item.toString()} // for warning about key and string
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled={true}
        removeClippedSubviews={false}
      />
    </View>
  );
  
}

const style = StyleSheet.create({
  outerContainer: {
    height: 80,
    borderTopWidth: .5,
    borderColor: '#800000',
    backgroundColor: 'black',
  },
  listViewContainer: {
    height: 72,
    paddingStart: 5,
  },
  buttons: {
    height: 60,
    width: 70,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 5,
    marginBottom: 5,
    backgroundColor: 'rgba(255, 255, 255, 1 )',
    borderRadius: 20,
    borderWidth: .1,
    borderColor: '#800000',
  },
  textStyle: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
});

export default Inventory;
