'use strict';

import React, { Component } from 'react';

import { View, Text, StyleSheet, FlatList, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';

const Inventory = () => {

    return (
        <View style={style.outerContainer}>
            <FlatList
            horizontal={true}
            contentContainerStyle={style.listViewContainer}
            data={[
                {key: 'empty'},
                {key: 'empty2'},
                {key: 'empty3'},
                {key: 'empty4'},
                {key: 'empty5'}
            ]}
            renderItem={({item}) => 
                <TouchableHighlight style={style.buttons}
                underlayColor={'#68a0ff'} >
                    <Text style={style.textStyle}>
                        {item.key}
                    </Text>
            </TouchableHighlight>}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            directionalLockEnabled={true}
            removeClippedSubviews={false}
            />
        </View>
    )

}

const style = StyleSheet.create({
    outerContainer: {
        height: 80, 
        backgroundColor: 'grey'
    },
    listViewContainer: {
        height: 72,
        paddingStart: 5,
    },
    buttons: {
        height: 60,
        width: 70,
        paddingTop: 20,
        paddingBottom: 20,
        marginRight: 5,
        marginLeft: 5,
        marginTop: 5,
        marginBottom: 5,
        backgroundColor: '#800000',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff', 
      },
      textStyle: {
        color: 'white',
        alignSelf: 'center'
      }
})

export default Inventory;