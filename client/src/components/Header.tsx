import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import { FiUser } from 'react-icons/fi';

import {
  StyledHeader,
  StyledNav,
  StyledLeftSide,
  StyledRightSide
} from '../styles/Header';

const Header = () => {
  return (
    <StyledHeader>
      <StyledNav>
        <StyledLeftSide>
          <SearchBar />
        </StyledLeftSide>
        <StyledRightSide>
          <Link to="/">
            <FiUser />
          </Link>
          <a href="http://localhost:4000/auth/google">
            <div style={{ backgroundColor: 'red' }}>Login with Google</div>
          </a>
        </StyledRightSide>
      </StyledNav>
    </StyledHeader>
  );
};
export default Header;
