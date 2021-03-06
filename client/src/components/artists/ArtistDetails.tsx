import React from 'react';
import { Link } from 'react-router-dom';
import { Artist } from '../../types/Artist';
import {
  StyledImage,
  StyledArtist,
  StyledName,
  StyledNB
} from '../../styles/artists/ArtistDetails';

interface Props {
  artist: Artist;
  hideLink?: boolean;
}

const ArtistDetails = ({ artist, hideLink }: Props) => {
  return (
    <StyledArtist>
      {hideLink ? (
        <>
          <StyledImage src={artist.picture_medium} alt={artist.name} />
          <p>{artist.name}</p>
          <p>{artist.nb_fan}</p>
        </>
      ) : (
        <Link to={`/artist/${artist.id}`}>
          <StyledImage src={artist.picture_medium} alt={artist.name} />
          <StyledName>{artist.name}</StyledName>
          <StyledNB>{artist.nb_fan}</StyledNB>
        </Link>
      )}
    </StyledArtist>
  );
};

export default ArtistDetails;
