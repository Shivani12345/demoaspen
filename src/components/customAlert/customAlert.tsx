import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal} from 'react-native';

const CustomAlert = ({visible, onClose, message, buttonText}) => {
  return (
    <Modal
      transparent
      animationType="slide"
      visible={visible}
      onRequestClose={() => onClose()}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
          <Text>{message}</Text>
          <TouchableOpacity onPress={() => onClose()}>
            <Text style={{color: 'blue', marginTop: 10}}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
