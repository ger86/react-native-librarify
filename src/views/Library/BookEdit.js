import React, {useState} from 'react';
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
import useBook from '../../hooks/useBook';

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

async function postData(data) {
  const response = await fetch('http://127.0.0.1:8000/api/books', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const json = await response.json();
  return json;
}

export default function BookEdit({route, navigation}) {
  const {bookId} = route.params;
  const {data: book, isLoading} = useBook({bookId});
  const [title, setTitle] = useState(book?.title);
  const [image, setImage] = useState(book?.image);
  const {invalidateBooksListCache} = useLibraryContext();
  const [mutate, {isPosting}] = useMutation(postData, {
    onSuccess: () => invalidateBooksListCache(),
  });

  async function handleSubmit() {
    await mutate({title, base64Image: image.uri});
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

  function handleSelectCategories(newCategories) {
    console.log(newCategories);
  }

  function handlePressEditCategories() {
    navigation.navigate('SelectCategoryModal', {
      categories: book.categories,
      onChange: handleSelectCategories,
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
        {book.categories.map(category => (
          <Text key={`category--${category.id}`}>{category.name}</Text>
        ))}
        <Button onPress={handlePressEditCategories} title="Editar categorías" />
      </View>
      <Button onPress={handleSubmit} title="Editar libro" />
      {isPosting && <Text>Editando tu libro...</Text>}
    </View>
  );
}
