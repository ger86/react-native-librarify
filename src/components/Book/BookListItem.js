import React from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import Text from 'src/components/ui/Text';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
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
        <View>
          <Text>{book.title}</Text>
          <View>
            {book.authors.map(author => (
              <Text key={author.id}>{author.name}</Text>
            ))}
          </View>
        </View>
        <Icon name="arrow-forward" style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}
