import React, {useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View} from 'react-native';
import {CREATE_AUTHOR} from 'src/consts/screens';
import useAuthors from 'src/hooks/useAuthors';
import AuthorListItem from './components/AuthorListItem';

function isAuthorSelected({selectedAuthors, author}) {
  return selectedAuthors.find(c => c.id === author.id);
}

export default function SelectAuthor({navigation, route}) {
  const {selectedAuthors: selectedAuthorsProps, fromScreen} = route.params;
  const [selectedAuthors, setSelectedAuthors] = useState(
    selectedAuthorsProps.map(c => ({...c})),
  );
  const {data: authors, isLoading, isSuccess} = useAuthors();

  useLayoutEffect(function() {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() =>
            navigation.navigate(fromScreen, {
              selectedAuthors,
            })
          }
          title="Cerrar"
        />
      ),
      headerRight: () => (
        <Button
          onPress={() => navigation.navigate(CREATE_AUTHOR)}
          title="Crear"
        />
      ),
      title: 'Seleccionar autor',
    });
  });

  function handleOnPress({author}) {
    if (isAuthorSelected({selectedAuthors, author})) {
      const newAuthors = selectedAuthors.filter(c => c.id !== author.id);
      setSelectedAuthors(newAuthors);
    } else {
      const newAuthors = [...selectedAuthors, author];
      setSelectedAuthors(newAuthors);
    }
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Cargando autores</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={isSuccess ? authors : []}
      renderItem={({item}) => (
        <AuthorListItem
          author={item}
          onPress={() => handleOnPress({author: item})}
          isSelected={isAuthorSelected({selectedAuthors, author: item})}
        />
      )}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <View>
          <Text>No hay autores</Text>
        </View>
      }
    />
  );
}
