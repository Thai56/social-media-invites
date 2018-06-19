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

const handleRoute = () => {
  Router.push({
    pathname: '/Dashboard',
    query: { user: 'ned' },
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
        <div
          style={{
            backgroundColor: 'white',
              height: 200,
              width: 200,
              borderRadius: 90,
              marginTop: 16,
          }} 
        />

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
                onClick={() => handleRoute()}
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
