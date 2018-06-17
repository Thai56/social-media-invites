import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Auth from './Auth';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import Button from '../components/Button';
import Header from '../components/Header';

const auth = new Auth();

const LinkToPath = ({ path, title }) => (
  <li>
    <Link href={path}>{title}</Link>
  </li>
);

Link.PropTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
}

const Index = () => (
  <MuiThemeProvider>
      <Header
        text="Welcome To SMI"
        showLink={
          <LinkToPath
            path="/about"
            title="About page"
          />
        }
        signIn={
          <Button
            // className="float-right"
            onClick={() => auth.login()}
          >
            Sign In
          </Button>
        }
        signOut={
          <Button
            // className="float-right" 
            onClick={() => auth.logout()}
          >
            Log out
          </Button>
        }
      />
      <hr />
    <p>Hello Next.js</p>
  </MuiThemeProvider>
)

export default Index
