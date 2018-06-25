import React from 'react';
import {
  Grid,
  Form,
  Segment,
  Header,
  Divider,
  Button,
} from 'semantic-ui-react';
import Router from 'next/router'
import styled from 'styled-components';

import fetchHelpers from '../utils/fetchHelper';
import userImg from '../img/default-user.png';


const UserImage = styled.div`
  background-image: url(${userImg}); 
  background-size: cover;
  height: 200px;
  width: 200px;
  border-radius: 90px;
  margin-top: 16px; 
`;

const handleRoute = () => {
  fetchHelpers.login()
    .then(({ data }) => {
      console.log('data ', data);
      localStorage.setItem('currentUser', JSON.stringify(data.user));
      Router.push({
        pathname: '/Dashboard',
        query: { user: data.user.email },
      });
    })
    .catch(err => {
      throw new Error(err);
    });
}

const RegisterLoginPage = ({ url }) => {
  const { query: { action } } = url;
  return (
    <div>
      <div
        style={{
          height: 400,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'blue',
        }}
      >
        <UserImage />
      </div>


      <Header textAlign='center'>{action.toUpperCase()}</Header>
      <Divider />

      <Grid centered style={{ marginTop: 24 }} columns={2}>
        <Grid.Column>
          <Form>
            <Form.Field>
              <label>Email</label>
              <input placeholder='example.me@email.com' />
            </Form.Field>
            <Form.Field>
              <label>Password</label>
              <input placeholder='password' />
            </Form.Field>
            <Segment padded>
              <Button
                primary
                fluid
                onClick={handleRoute}
              >
                {action.slice(0, 1).toUpperCase().concat(action.slice(1))}
              </Button>
              <Divider horizontal>Or</Divider>
              <Button secondary fluid>
                {action === 'register' ? 'Login' : 'Register'}
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default RegisterLoginPage;
