import React from 'react';
import {useQuery} from 'react-query';
import {FlatList, Text, View} from 'react-native';
import BookListItem from '../../components/Book/BookListItem';

const GET_BOOKS = 'GET_BOOKS';

async function fetchData() {
  const response = await fetch('http://127.0.0.1:8000/api/books');
  const json = await response.json();
  return json;
}

export default function BooksList({navigation}) {
  function handleOnPress() {
    navigation.navigate('BookDetail');
  }

  const {status, data} = useQuery(GET_BOOKS, fetchData);
  return (
    <View>
      <FlatList
        data={status === 'success' ? data : []}
        renderItem={({item}) => (
          <BookListItem book={item} onPress={handleOnPress} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={
          <View>
            <Text>Mi lista de libros</Text>
          </View>
        }
        ListEmptyComponent={
          <View>{status === 'loading' && <Text>Cargando libros...</Text>}</View>
        }
      />
    </View>
  );
}
