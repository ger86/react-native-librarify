import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  View,
  Image,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import {useMutation} from 'react-query';
import ImagePicker from 'react-native-image-picker';
import useLibraryContext from '../../hooks/useLibraryContext';
import useBook, {useInvalidateBook} from '../../hooks/useBook';

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
  const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  console.log(json);
  return json;
}

function prepareCategoriesForSendingToBackend({oldCategories, newCategories}) {
  let indexForNewCategories = oldCategories.length;
  const oldCategoriesIndexById = oldCategories.reduce(
    (acc, oldCategory, index) => {
      return {
        ...acc,
        [oldCategory.id]: index,
      };
    },
    {},
  );
  return newCategories.reduce((acc, category, index) => {
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

export default function BookEdit({route, navigation}) {
  const {bookId} = route.params;
  const {data: book, isLoading} = useBook({bookId});
  const invalidateBook = useInvalidateBook({bookId});
  const [title, setTitle] = useState(book?.title);
  const [image, setImage] = useState(book?.image);
  const [categories, setCategories] = useState(
    book?.categories.map(c => ({...c})),
  );
  const {invalidateBooksListCache} = useLibraryContext();
  const [mutate, {isPosting}] = useMutation(postData, {
    onSuccess: () => invalidateBooksListCache(),
  });

  useEffect(() => {
    if (route.params?.selectedCategories) {
      setCategories(route.params?.selectedCategories);
    }
  }, [route.params]);

  async function handleSubmit() {
    let data = {
      title,
      categories: prepareCategoriesForSendingToBackend({
        oldCategories: book.categories,
        newCategories: categories,
      }),
    };
    if (image.includes('data:image/jpeg;base64')) {
      data = {
        ...data,
        base64Image: image,
      };
    }
    console.log('hola');
    console.log(data);
    await mutate(
      {data, id: book.id},
      {
        onSuccess: invalidateBook,
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
    navigation.navigate('SelectCategoryModal', {
      selectedCategories: categories,
    });
  }

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Cargando libro...</Text>
      </View>
    );
  }

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
      <Button onPress={handleSubmit} title="Editar libro" />
      {isPosting && <Text>Editando tu libro...</Text>}
    </View>
  );
}
