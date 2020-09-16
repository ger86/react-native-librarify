import React, {useEffect, useState} from 'react';
import {View, Image, TextInput, Button, StyleSheet, Text} from 'react-native';
import {useMutation} from 'react-query';
import ImagePicker from 'react-native-image-picker';
import {SELECT_CATEGORY_MODAL, SELECT_CATEGORY} from 'src/consts/screens';
import apiFetch from 'src/services/apiFetch';

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
    resizeMode: 'contain',
    marginRight: 10,
    marginBottom: 10,
  },
});

const options = {
  title: 'Selecciona la carátula de tu libro',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
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

function prepareCategories({oldCategories, newCategories}) {
  let indexForNewCategories = oldCategories.length;
  const oldCategoriesIndexById = oldCategories.reduce(
    (acc, oldCategory, index) => ({
      ...acc,
      [oldCategory.id]: index,
    }),
    {},
  );
  return newCategories.reduce((acc, category) => {
    const indexForOldCategory = oldCategoriesIndexById[category.id];
    if (indexForOldCategory !== undefined) {
      return {
        ...acc,
        [indexForOldCategory]: category,
      };
    } else {
      return {
        ...acc,
        [indexForNewCategories++]: category,
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
  const [mutate, {isPosting}] = useMutation(postData);

  useEffect(
    function() {
      if (route.params?.selectedCategories) {
        setCategories(route.params?.selectedCategories);
      }
    },
    [route.params],
  );

  async function handleSubmit() {
    let data = {
      title,
      categories: prepareCategories({
        oldCategories: book ? book.categories : [],
        newCategories: categories,
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
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log(response.data);
        setImage(`data:image/jpeg;base64,${response.data}`);
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

  const isEditing = Boolean(book?.id);

  return (
    <View style={styles.container}>
      <View style={styles.formRowOne}>
        <View>
          {image && <Image source={{uri: image}} style={styles.image} />}
          <Button onPress={launchImagePicker} title="Seleccionar carátula" />
        </View>
        <TextInput
          onChangeText={text => setTitle(text)}
          style={styles.textInput}
          value={title}
        />
      </View>
      <View>
        {categories.map(category => (
          <Text key={`category--${category.id}`}>{category.name}</Text>
        ))}
        <Button onPress={handlePressEditCategories} title="Editar categorías" />
      </View>
      <Button onPress={handleSubmit} title={isEditing ? 'Editar' : 'Añadir'} />
      {isPosting && (
        <Text>{isEditing ? 'Editando libro...' : 'Añadiendo libro...'}</Text>
      )}
    </View>
  );
}
