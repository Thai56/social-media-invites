import React from 'react';
import Link from 'next/link';

const Header = ({ text, showLink, signIn, signOut }) => {
  return (
    <nav className="nav navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <a href="#" className="nav-link">{text}</a>
          <ul className="nav navbar-nav">
            { showLink && showLink }
            <br />
            { signIn && signIn }
            { signOut && signOut }
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

