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
    width: 75,
    height: 75,
    marginRight: 10,
    resizeMode: 'contain',
  },
  icon: {
    color: '#000',
    marginLeft: 'auto',
  },
});

export default function BookListItem({book, onPress}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {book.image && (
          <Image source={{uri: book.image}} style={styles.image} />
        )}
        <Text>{book.title}</Text>
        <Icon name="chevron-forward-outline" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}
