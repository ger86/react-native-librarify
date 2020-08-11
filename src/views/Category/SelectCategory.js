import React, {useLayoutEffect, useState} from 'react';
import {ActivityIndicator, Button, FlatList, Text, View} from 'react-native';
import useCategories from '../../hooks/useCategories';
import CategoryListItem from './components/CategoryListItem';

function isCategorySelected({selectedCategories, category}) {
  return selectedCategories.find(c => c.id === category.id);
}

export default function SelectCategory({route, navigation}) {
  const {selectedCategories: selectedCategoriesProps} = route.params;
  const [selectedCategories, setSelectedCategories] = useState(
    selectedCategoriesProps.map(c => ({...c})),
  );
  const {data: categories, isLoading, isSuccess} = useCategories();

  useLayoutEffect(function() {
    navigation.setOptions({
      headerLeft: () => (
        <Button
          onPress={() =>
            navigation.navigate('BookEdit', {
              selectedCategories,
            })
          }
          title="Cerrar"
        />
      ),
      title: 'Seleccionar categorías',
    });
  });

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Cargando categorías...</Text>
      </View>
    );
  }

  function handleOnPress({category}) {
    if (isCategorySelected({selectedCategories, category})) {
      const newCategories = selectedCategories.filter(
        c => c.id !== category.id,
      );
      setSelectedCategories(newCategories);
    } else {
      const newCategories = [...selectedCategories, category];
      setSelectedCategories(newCategories);
    }
  }

  return (
    <FlatList
      data={isSuccess ? categories : []}
      renderItem={({item}) => (
        <CategoryListItem
          category={item}
          onPress={() => handleOnPress({category: item})}
          isSelected={isCategorySelected({selectedCategories, category: item})}
        />
      )}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <View>
          <Text>No hay categorías disponibles</Text>
        </View>
      }
    />
  );
}
