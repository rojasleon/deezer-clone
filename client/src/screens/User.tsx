import React, { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Context as SearchContext, State } from '../contexts/tracks';

const User = () => {
  const { fetchUser } = useContext<State>(SearchContext);
  const { userId } = useParams();

  useEffect(() => {
    fetchUser({ value: userId || '' });
  }, []);

  return <div>User</div>;
};

export default User;