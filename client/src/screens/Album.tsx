import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Context as TracksContext,
  State as TrackState
} from '../contexts/tracks';
import {
  Context as FavoriteContext,
  State as FavoriteState
} from '../contexts/favorites';
import AlbumDetails from '../components/albums/AlbumDetails';

const AlbumScreen = () => {
  const {
    state: { album, isLoading },
    fetchAlbum
  } = useContext<TrackState>(TracksContext);
  const { fetchFavorites } = useContext<FavoriteState>(FavoriteContext);
  const { albumId } = useParams();

  useEffect(() => {
    fetchAlbum({ value: albumId || '' });
    fetchFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loading = Object.keys(album).length === 0 && isLoading;

  return (
    <div>
      {loading && <div>Loading...</div>}
      <AlbumDetails album={album} hideLink />
    </div>
  );
};

export default AlbumScreen;
