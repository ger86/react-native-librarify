import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {useMutation} from 'react-query';
import {useInvalidateCategories} from 'src/hooks/useCategories';
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

async function postCategory({data, id}) {
  const path = '/categories';
  const response = await apiFetch(path, {
    method: 'POST',
    body: JSON.stringify(data),
  });
  const json = await response.json();
  return json;
}

export default function BookForm({route, navigation}) {
  const [name, setName] = useState('');
  const invalidateCategoriesList = useInvalidateCategories();
  const [mutate, {isPosting}] = useMutation(postCategory);

  async function handleSubmit() {
    let data = {
      name,
    };
    await mutate(
      {data},
      {
        onSuccess: function() {
          invalidateCategoriesList();
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
      <Button onPress={handleSubmit} title="Crear Categoría" />
      {isPosting && <Text>Creando categoría</Text>}
    </View>
  );
}
