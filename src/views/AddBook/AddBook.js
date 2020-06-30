import React, {useState} from 'react';
import {
  SafeAreaView,
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

const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 16,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
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

export default function AddBook() {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const {invalidateBooksListCache} = useLibraryContext();
  const [mutate, {isLoading}] = useMutation(postData, {
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
        const source = {uri: `data:image/jpeg;base64,${response.data}`};
        setImage(source);
      }
    });
  }

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <TextInput
          onChangeText={text => setTitle(text)}
          style={styles.textInput}
          value={title}
        />
        {image && <Image source={image} style={styles.image} />}
        <Button onPress={launchImagePicker} title="Seleccionar carátula" />
        <Button onPress={handleSubmit} title="Añadir libro" />
        {isLoading && <Text>Añadiendo libro a tu biblioteca</Text>}
      </View>
    </SafeAreaView>
  );
}
