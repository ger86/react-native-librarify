import React from 'react';
import {FlatList, Text, View} from 'react-native';
import BookListItem from 'src/components/Book/BookListItem';
import useLibraryContext from 'src/hooks/useLibraryContext';

export default function BooksList({navigation}) {
  function handleOnPress({bookId}) {
    navigation.navigate('BookDetail', {bookId});
  }

  const {isSuccess, isLoading, books} = useLibraryContext();
  return (
    <View>
      <FlatList
        data={isSuccess ? books : []}
        renderItem={({item}) => (
          <BookListItem
            book={item}
            onPress={() => handleOnPress({bookId: item.id})}
          />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <Text>Mi lista de libros</Text>
          </View>
        }
        ListEmptyComponent={
          <View>{isLoading && <Text>Cargando libros...</Text>}</View>
        }
      />
    </View>
  );
}
