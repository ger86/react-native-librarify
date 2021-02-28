import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useMutation} from 'react-query';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  SELECT_CATEGORY_MODAL,
  SELECT_CATEGORY,
  SELECT_AUTHOR_MODAL,
  SELECT_AUTHOR,
} from 'src/consts/screens';
import apiFetch from 'src/services/apiFetch';
import Text from 'src/components/ui/Text';
import Button from 'src/components/ui/Button';
import TextInput from 'src/components/ui/TextInput';

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  formRowOne: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    minWidth: 150,
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 10,
    marginBottom: 10,
  },
  formGroup: {
    marginBottom: 16,
  },
});

const options = {
  mediaType: 'photo',
  includeBase64: true,
};

async function postData({data, id}) {
  const path = id ? `/books/${id}` : '/books';
  const response = await apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

function prepareList({oldElements, newElements}) {
  let indexForNewElements = oldElements.length;
  const oldElementsIndexById = oldElements.reduce(
    (acc, oldElement, index) => ({
      ...acc,
      [oldElement.id]: index,
    }),
    {},
  );
  return newElements.reduce((acc, element) => {
    const indexOfOldElement = oldElementsIndexById[element.id];
    if (indexOfOldElement !== undefined) {
      return {
        ...acc,
        [indexOfOldElement]: element,
      };
    } else {
      return {
        ...acc,
        [indexForNewElements++]: element,
      };
    }
  }, {});
}

export default function BookForm({
  route,
  navigation,
  book,
  onSuccess,
  fromScreen,
}) {
  const [title, setTitle] = useState(book?.title);
  const [image, setImage] = useState(book?.image);
  const [categories, setCategories] = useState(
    book ? book.categories.map(c => ({...c})) : [],
  );
  const [authors, setAuthors] = useState(
    book ? book.authors.map(a => ({...a})) : [],
  );
  const [mutate, {isLoading}] = useMutation(postData);

  useEffect(
    function() {
      if (route.params?.selectedCategories) {
        setCategories(route.params?.selectedCategories);
      }
    },
    [route.params],
  );

  useEffect(
    function() {
      if (route.params?.selectedAuthors) {
        setAuthors(route.params?.selectedAuthors);
      }
    },
    [route.params],
  );

  async function handleSubmit() {
    let data = {
      title,
      categories: prepareList({
        oldElements: book ? book.categories : [],
        newElements: categories,
      }),
      authors: prepareList({
        oldElements: book ? book.authors : [],
        newElements: authors,
      }),
    };
    if (image.includes('data:image/jpeg;base64')) {
      data = {
        ...data,
        base64Image: image,
      };
    }
    await mutate(
      {data, id: book?.id},
      {
        onSuccess,
      },
    );
  }

  function launchImagePicker() {
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorCode);
      } else {
        setImage(`data:image/jpeg;base64,${response.base64}`);
      }
    });
  }

  function handlePressEditCategories() {
    navigation.navigate(SELECT_CATEGORY_MODAL, {
      screen: SELECT_CATEGORY,
      params: {
        selectedCategories: categories,
        fromScreen,
      },
    });
  }

  function handlePressEditAuthors() {
    navigation.navigate(SELECT_AUTHOR_MODAL, {
      screen: SELECT_AUTHOR,
      params: {
        selectedAuthors: authors,
        fromScreen,
      },
    });
  }

  const isEditing = Boolean(book?.id);
  return (
    <View style={styles.container}>
      <View style={styles.formRowOne}>
        <View>
          {image && <Image source={{uri: image}} style={styles.image} />}
          <Button
            type="outline"
            onPress={launchImagePicker}
            title="Seleccionar carátula"
          />
        </View>
      </View>
      <View style={styles.formGroup}>
        <TextInput
          label="Título"
          onChangeText={text => setTitle(text)}
          style={styles.textInput}
          value={title}
        />
      </View>
      <View style={styles.formGroup}>
        <Text h4>Categorías</Text>
        {categories.map(category => (
          <Text key={`category--${category.id}`}>{category.name}</Text>
        ))}
        <Button
          type="outline"
          onPress={handlePressEditCategories}
          title="Editar categorías"
        />
      </View>
      <View style={styles.formGroup}>
        <Text h4>Autores</Text>
        {authors.map(author => (
          <Text key={`author--${author.id}`}>{author.name}</Text>
        ))}
        <Button
          type="outline"
          onPress={handlePressEditAuthors}
          title="Editar autores"
        />
      </View>
      <View>
        <Button
          disabled={isLoading}
          onPress={handleSubmit}
          title={isEditing ? 'Editar' : 'Añadir'}
        />
        {isLoading && (
          <Text>{isEditing ? 'Editando libro...' : 'Añadiendo libro...'}</Text>
        )}
      </View>
    </View>
  );
}
