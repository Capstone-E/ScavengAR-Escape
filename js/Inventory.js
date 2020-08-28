'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  Image,
} from 'react-native';

import keyImage from './res/keyImage.png'

class Inventory extends Component {

  render(){

    return (

      <View style={style.outerContainer}>
        <FlatList
          horizontal={true}
          contentContainerStyle={style.listViewContainer}
          data={[
            { key: this.props.objectsStatus[0] ? keyImage : 'Slot One Empty'},
            // { key: '' },
            // { key: '' },
            // { key: '' },
            // { key: questionMark },
          ]}
          renderItem={({ item }) => (
            <TouchableHighlight style={style.buttons} underlayColor={'#68a0ff'}>
              <View style={{height: 50, width: 60}}>
                {('Empty'.includes(item.key)) ?
                  <Image style={{height: 50, width: 50}} source={item.key} />
                  :
                  <Text style={style.textStyle}>{item.key}</Text>
                }
                
              </View>
            </TouchableHighlight>
          )}
          keyExtractor={item => item.toString()} // for warning about key and string 
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          directionalLockEnabled={true}
          removeClippedSubviews={false}

        />
      </View>
    );
  }
};

const style = StyleSheet.create({
  outerContainer: {
    height: 75,
    backgroundColor: 'grey',
  },
  listViewContainer: {
    height: 65,
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
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#800000',
  },
  textStyle: {
    marginTop: 6,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'black',
    alignSelf: 'center',
  },
});

const mapState = state => {
  return { objectsStatus: state.objectsStatus }
}

export default connect(mapState)(Inventory);
