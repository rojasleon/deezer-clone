import React from 'react';
import { Track } from '../../types/Tracks';
import {
  StyledTrack,
  StyledFirstElement
} from '../../styles/tracks/TrackDetails';
import { AiFillPlayCircle, AiFillHeart } from 'react-icons/ai';
import { FiHeart } from 'react-icons/fi';

interface Props {
  selectTrack: (track: any) => void;
  selectFavoriteTrack?: (trackId: string) => void;
  isFavorite: boolean;
  track: Track;
  index?: number;
}

const TrackDetails = ({
  track,
  selectTrack,
  isFavorite,
  selectFavoriteTrack,
  index
}: Props): JSX.Element => {
  const renderHeart = () => {
    if (isFavorite) {
      return <AiFillHeart className="heart-filled" />;
    }

    if (selectFavoriteTrack) {
      return (
        <FiHeart
          onClick={() => selectFavoriteTrack(String(track.id))}
          className="heart"
        />
      );
    }
  };

  return (
    <StyledTrack>
      <StyledFirstElement>
        {track.album ? (
          <img src={track.album.cover_medium} alt={track.album.title} />
        ) : (
          <span>{index}</span>
        )}
        <AiFillPlayCircle onClick={() => selectTrack(track)} className="play" />
        {renderHeart()}
        <p>{track.title}</p>
      </StyledFirstElement>
      <p>{track.artist?.name}</p>
      <p>{track.album?.title}</p>
    </StyledTrack>
  );
};

export default TrackDetails;
