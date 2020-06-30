import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
} from 'react-native';
import {useMutation} from 'react-query';
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
});

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
  const {invalidateBooksListCache} = useLibraryContext();
  const [mutate, {isLoading}] = useMutation(postData, {
    onSuccess: () => invalidateBooksListCache(),
  });

  async function handleSubmit() {
    await mutate({title});
  }

  return (
    <SafeAreaView>
      <View style={styles.form}>
        <TextInput
          onChangeText={text => setTitle(text)}
          style={styles.textInput}
          value={title}
        />
        <Button onPress={handleSubmit} title="Añadir libro" />
        {isLoading && <Text>Añadiendo libro a tu biblioteca</Text>}
      </View>
    </SafeAreaView>
  );
}
