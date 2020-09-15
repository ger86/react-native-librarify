import React, {useLayoutEffect} from 'react';
import {ActivityIndicator, Button, Text, View} from 'react-native';
import useBook from 'src/hooks/useBook';

export default function BookDetail({navigation, route}) {
  const {bookId} = route.params;
  const {data: book, isLoading, isSuccess} = useBook({bookId});
  useLayoutEffect(function() {
    if (isSuccess) {
      navigation.setOptions({
        headerRight: () => (
          <Button
            onPress={() =>
              navigation.navigate('BookEdit', {
                bookId: book.id,
              })
            }
            title="Editar"
          />
        ),
        title: book.title,
      });
    }
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Cargando libro...</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Soy el libro {book.title}</Text>
      <View>
        <Text>Categorías</Text>
        {book.categories.map(category => (
          <Text key={`category--${category.id}`}>{category.name}</Text>
        ))}
      </View>
    </View>
  );
}
