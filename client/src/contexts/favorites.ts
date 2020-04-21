import { Reducer, Dispatch } from 'react';
import createDataContext from './createData';
import deezerAPI from '../api/deezer';
import { Track } from '../types/Tracks';

interface FavoriteState {
  favorites: Track[];
  errorMessage: string;
}

export interface State {
  state: FavoriteState;
  fetchFavorites: () => void;
  createFavorite: (trackId: string) => void;
}

enum ActionType {
  ERROR,
  FETCH_FAVORITES,
  CREATE_FAVORITE
}

interface FavoriteActions {
  type: ActionType;
  payload?: any;
}

const favoriteReducer: Reducer<FavoriteState, FavoriteActions> = (
  state,
  action
) => {
  switch (action.type) {
    case ActionType.FETCH_FAVORITES:
      return { ...state, favorites: action.payload };
    case ActionType.CREATE_FAVORITE:
      return { ...state, favorites: action.payload };
    default:
      return state;
  }
};

const fetchFavorites = (dispatch: Dispatch<FavoriteActions>) => async () => {
  try {
    const { data } = await deezerAPI.get('/favorites');
    dispatch({ type: ActionType.FETCH_FAVORITES, payload: data });
  } catch (err) {
    dispatch({ type: ActionType.ERROR, payload: err.message });
  }
};

const createFavorite = (dispatch: Dispatch<FavoriteActions>) => async (
  trackId: string
) => {
  try {
    const { data } = await deezerAPI.post('/favorites', { trackId });
    dispatch({ type: ActionType.CREATE_FAVORITE, payload: data });
  } catch (err) {
    dispatch({ type: ActionType.CREATE_FAVORITE, payload: err.message });
  }
};

export const { Provider, Context } = createDataContext(
  favoriteReducer,
  { fetchFavorites, createFavorite },
  { errorMessage: '', favorites: [] }
);
