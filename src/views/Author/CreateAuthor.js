import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {useMutation} from 'react-query';
import {useInvalidateAuthors} from 'src/hooks/useAuthors';
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
});

async function postAuthor({data, id}) {
  const path = '/authors';
  const response = await apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

export default function CreateAuthor({route, navigation}) {
  const [name, setName] = useState('');
  const invalidateAuthorsList = useInvalidateAuthors();
  const [mutate, {isPosting}] = useMutation(postAuthor);

  async function handleSubmit() {
    let data = {
      name,
    };
    await mutate(
      {data},
      {
        onSuccess: function() {
          invalidateAuthorsList();
          navigation.goBack();
        },
      },
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formRowOne}>
        <TextInput
          onChangeText={text => setName(text)}
          style={styles.textInput}
          value={name}
        />
      </View>
      <Button onPress={handleSubmit} title="Crear Autor" />
      {isPosting && <Text>Creando autor</Text>}
    </View>
  );
}
