import React from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {lightBlack, themeBlue, white} from '../constants/Colors';

export default function Tag(props: any) {
  const {title, onPress, selected} = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.tag, {backgroundColor: selected ? themeBlue : white }]} onPress={onPress}>
        <Text style={[styles.title, {color: selected ? white : lightBlack }]}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 6,
    // height: 40,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderRadius: 20,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  title: {
    color: lightBlack,
    fontSize: 18,
    fontWeight: 'normal',
  }
})