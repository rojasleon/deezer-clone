import React, { useContext } from 'react';
import { Context as TracksContext } from '../../contexts/tracks';
import ArtistDetails from './ArtistDetails';
import { Artist } from '../../types/Artist';
import { StyledContainer } from '../../styles/artists/Artists';

const Artists = () => {
  const { state } = useContext(TracksContext);

  return (
    <>
      <StyledContainer>
        {state.artists.map((artist: Artist) => (
          <ArtistDetails key={artist.id} artist={artist} />
        ))}
      </StyledContainer>
    </>
  );
};

export default Artists;
