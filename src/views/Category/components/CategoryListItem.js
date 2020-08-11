import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-ionicons';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  icon: {
    color: '#000',
    marginLeft: 'auto',
  },
});

export default function CategoryListItem({category, onPress, isSelected}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text>{category.name}</Text>
        {isSelected && <Icon name="checkmark" style={styles.icon} />}
      </View>
    </TouchableOpacity>
  );
}
