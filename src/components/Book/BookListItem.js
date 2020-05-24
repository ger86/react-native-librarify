import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingLeft: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  icon: {
    color: '#000',
    marginLeft: 'auto',
  },
});

const IMAGE_URL = 'https://picsum.photos/200/75';
export default function BookListItem({book, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Image source={{uri: IMAGE_URL}} style={styles.image} />
        <Text>{book.title}</Text>
        <Icon name="chevron-forward-outline" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}