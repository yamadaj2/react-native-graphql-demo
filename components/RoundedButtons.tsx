import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function RoundedButton(props: {text: String, icon: String, textColor: String, backgroundColor: any, onPress: Function}) {
  const { text, icon, textColor, backgroundColor, onPress } = props;
  const color: any = textColor || 'white';
  return (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={[styles.wrapper, { backgroundColor: backgroundColor || 'transparent' }]}
    >
      <View style={styles.buttonTextWrapper}>
        <View style={styles.icon}>{icon}</View>
        <Text style={[{ color }, styles.buttonText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  icon: {
    left: -25,
  },
  wrapper: {
    display: 'flex',
    padding: 15,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: 'white',
    marginBottom: 15,
    width: '100%',
  },
  buttonText: {
    fontSize: 16,
    margin: 'auto'
  },
  buttonTextWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }
});