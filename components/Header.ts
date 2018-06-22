import React from 'react';
import { Segment, Button } from 'semantic-ui-react';
import Router from 'next/router';

export interface routeHandlerProps {
  action: string,
}

const routeHandler = (action: routeHandlerProps) => {
  Router.push({
    pathname: '/UserLogin',
    query: { action: action },
  })
};

export interface HeaderProps {
  text: string,
}

const Header = ({ text }: HeaderProps) => {
  return (
    <Segment style={{ display: 'flex', justifyContent: 'space-between'}}>
      <h1 id="header-icon">{text}</h1>
      <div>
      <Button onClick={() => routeHandler('register')}>
        Register
      </Button>
      <Button primary onClick={() => routeHandler('login')}>
        Login
      </Button>
      </div>
      <style jsx>{`
        #header-icon {
          font-family: 'Shrikhand', cursive;
          color: red;
        }
        `}</style>
    </Segment>
  );
};

export default Header;

