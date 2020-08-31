import React, {useState} from 'react'
import {Alert, Modal, StyleSheet, Text, TouchableHighlight, View} from 'react-native'

const HintButton = () => {
  const hintsArr = [
    `First Hint: a long riddle that will blow your mind`,
    `Second Hint: you can't believe the answer was so simple`,
    `Final Hint: truly the hardest, most difficult puzzle you've ever encountered`
  ]
  const [modalVisible, setModalVisible] = useState(false)
  const [count, setCount] = useState(0)

  const hintView = () => {
    const currentHints = hintsArr.slice(0, count)
    return (
      <View>
        {currentHints.map((hint, i) => (
          <Text style={styles.center} key={i}>
            {hint}
          </Text>
        ))}
      </View>
    )
  }

  return (
    <View
      style={{
        flex: 1,
        position: 'absolute',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        top: '2%',
        right: 10,
        width: 80,
        height: 220
      }}
    >
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={{backgroundColor: 'transparent'}}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hints {count}/3</Text>
            {hintView()}
            <TouchableHighlight
              style={{...styles.hideButton, backgroundColor: '#800000'}}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
              underlayColor="#00000000"
            >
              <Text style={styles.textStyle}>Hide Hints</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
        <TouchableHighlight
          style={{...styles.openButton}}
          onPress={() => {
            if (count <= 3) {
              setCount(count + 1)
            }
            setModalVisible(true)
          }}
          underlayColor="#00000000"
        >
          <Text style={styles.textStyle}> ?</Text>
        </TouchableHighlight>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  center: {
    textAlign: 'center'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 35,
    alignItems: 'center',
    elevation: 5
  },
  openButton: {
    backgroundColor: '#800000',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: 12,
    elevation: 2,
    height: 5
  },
  hideButton: {
    backgroundColor: '#800000',
    borderRadius: 50,
    padding: 10,
    elevation: 2
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center'
  }
})

export default HintButton
