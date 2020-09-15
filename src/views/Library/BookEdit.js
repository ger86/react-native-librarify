import React, {useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import BookForm from 'src/components/Book/BookForm';
import {BOOK_EDIT} from 'src/consts/screens';
import useLibraryContext from 'src/hooks/useLibraryContext';
import useBook, {useInvalidateBook} from 'src/hooks/useBook';

export default function BookEdit({route, navigation}) {
  const {bookId} = route.params;
  const {data: book, isLoading} = useBook({bookId});
  const invalidateBook = useInvalidateBook({bookId});
  const {invalidateBooksListCache} = useLibraryContext();

  const handleSuccess = useCallback(
    function() {
      invalidateBooksListCache();
      invalidateBook();
    },
    [invalidateBook, invalidateBooksListCache],
  );

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Cargando libro...</Text>
      </View>
    );
  }

  return (
    <BookForm
      fromScreen={BOOK_EDIT}
      route={route}
      navigation={navigation}
      book={book}
      onSuccess={handleSuccess}
    />
  );
}
