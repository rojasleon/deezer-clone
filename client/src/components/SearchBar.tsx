import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Context as TracksContext } from '../contexts/tracks';
import { useTextInput } from '../hooks/useTextInput';
import { useDebounce } from '../hooks/useDebounce';
import { useDocumentTitle } from '../hooks/useDocumentTitle';
import TextInput from './TextInput';
import Spinner from './Spinner';
import SearchBarIcon from './SearchBarIcon';
import { StyledInputContainer } from '../styles/SearchBar';

const SearchBar = (): JSX.Element => {
  const { state } = useContext(TracksContext);
  const input = useTextInput('');
  const debouncedSearchTerm = useDebounce({
    value: input.bind.value,
    delay: 500
  });
  const history = useHistory();
  useDocumentTitle(input.bind.value);

  useEffect(() => {
    // I don't need to execute this effect when the value changes, useDebounce hook already has
    // as a dependency (input.value), so, useDebounce will run if the value change.
    // And also we shouldn't run this effect if fetchTracks changes (that will case an infinite loop),
    // only once
    if (debouncedSearchTerm) {
      history.push(`/search/${input.bind.value}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  return (
    <StyledInputContainer>
      <TextInput {...input} />
      {state.isLoading ? (
        <Spinner />
      ) : (
        <SearchBarIcon
          itHasText={debouncedSearchTerm}
          cleanText={input.reset}
        />
      )}
      {state.isError && <div>Something went wrong</div>}
    </StyledInputContainer>
  );
};

export default SearchBar;
