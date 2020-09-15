import React, {useCallback} from 'react';
import {SafeAreaView} from 'react-native';
import BookForm from 'src/components/Book/BookForm';
import {ADD_BOOK} from 'src/consts/screens';
import useLibraryContext from 'src/hooks/useLibraryContext';

export default function AddBook({route, navigation}) {
  const {invalidateBooksListCache} = useLibraryContext();

  const handleSuccess = useCallback(
    function() {
      invalidateBooksListCache();
    },
    [invalidateBooksListCache],
  );

  return (
    <SafeAreaView>
      <BookForm
        fromScreen={ADD_BOOK}
        route={route}
        navigation={navigation}
        book={null}
        onSuccess={handleSuccess}
      />
    </SafeAreaView>
  );
}
