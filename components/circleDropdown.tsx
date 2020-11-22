import React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

const propTypes = {};
const defaultProps = {
  styles: {
    wrapper: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 40,
      right: 20,
      width: 30,
      height: 30,
    },
    buttonText: {
      fontSize: 16,
    },
    buttonTextWrapper: {
      justifyContent: 'center'
    }
  }
};

export default function CircleDropdown(props: {text: String, textColor: String, backgroundColor: any, onPress: Function, styles: Object}) {
  const { text, textColor, backgroundColor, onPress, styles} = props;
  const color: any = textColor || 'white';
  return (
    <TouchableOpacity onPress={onPress} style={[styles.wrapper, { backgroundColor: backgroundColor || 'transparent' }]}>
      <View style={styles.buttonTextWrapper}>
        <Text style={[{ color }, styles.buttonText]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

CircleDropdown.propTypes = propTypes;
CircleDropdown.defaultProps = defaultProps;