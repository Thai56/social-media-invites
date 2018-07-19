import React from 'react';
import { Segment, Header, Tab, Spinner } from 'semantic-ui-react';
import { fromJS } from 'immutable';
import RegisterView from '../components/RegisterView';
import BusinessesView from '../components/BusinessesView';
import Router from 'next/router'

import constants from '../utils/constants';
import fetchHelpers from '../utils/fetchHelper';
import registerUtils from '../utils/registerUtils';

const { postBusiness, getUserBusinesses } = fetchHelpers;
const { CURRENT_USER } = constants;
const { mapIdAsKey } = registerUtils; 

export default class Dashboard extends React.Component {
  state={ 
    currentUser: fromJS({}), 
    businesses: fromJS([{}]), 
  }
  
    
  componentDidMount() {
    if (!localStorage || !localStorage.getItem(CURRENT_USER)) {
      Router.push({ pathname: 'Login' });
    }

    if (localStorage && localStorage.getItem(CURRENT_USER)) {
      this.setState(() => ({ isLoading: true }));
      const currentUser = fromJS(JSON.parse(localStorage.getItem(CURRENT_USER)));
      getUserBusinesses({ userId: currentUser.get('_id') })
        .then(({ data }) => {
          console.groupCollapsed('componentDidMount ');
          console.log('data ', data);
          console.groupEnd();
          this.setState(() => ({
            currentUser,
            businesses: mapIdAsKey(['place_id'], fromJS(data)),
            isLoading: false,
          }));
        });
    }
  }
  componentDidMount() {
    if (!localStorage || !localStorage.getItem(CURRENT_USER)) {
      Router.push({ pathname: 'Login' });
    }

    if (localStorage && localStorage.getItem(CURRENT_USER)) {
      this.setState(() => ({ isLoading: true }));
      const currentUser = fromJS(JSON.parse(localStorage.getItem(CURRENT_USER)));
      getUserBusinesses({ userId: currentUser.get('_id') })
        .then(({ data }) => {
          console.groupCollapsed('componentDidMount ');
          console.log('data ', data);
          console.groupEnd();
          this.setState(() => ({
            currentUser,
            businesses: mapIdAsKey(['place_id'], fromJS(data)),
            isLoading: false,
          }));
        });
    }
  }

  getPanes = () =>
    [
      {
        menuItem: 'Register',
        render: () => 
        <Tab.Pane>
        <RegisterView 
        savePlace={this.savePlace} 
        businesses={this.state.businesses}
        user={this.state.currentUser}
        />
        </Tab.Pane>,
      },
      {
        menuItem: 'View',
        render: () => 
        <Tab.Pane>
        <BusinessesView 
        user={this.state.currentUser} 
        businesses={this.state.businesses} 
        />
        </Tab.Pane> 
      },
      {
        menuItem: 'Account',
        render: () => <Tab.Pane>Account Page</Tab.Pane>,
      },
    ];
 
  

  savePlace = (place: object) => {
    const { businesses } = this.state;

    if (!this.state.businesses.has(place.place_id)) {
      postBusiness(
        fromJS(place)
        .set('userId', this.state.currentUser.get('_id'))
        .set('reviewUrl', `https://search.google.com/local/writereview?placeid=${place.place_id}`)
      )
        .then(({ data }) => {
          this.setState(() => ({
            businesses: mapIdAsKey(['place_id'], fromJS(data)),
          }));
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    return(
      <div style={{ height: '100vh' }}>
        <Segment style={{ position: 'relative' }}>
        <Header id="header-icon">
          Social Media Invites
        </Header>

        <div 
          style={{ 
            position: 'absolute',
            right: '3%',
            bottom: '50%',
          }}
        >
            <div style={{ float: 'left' }}>
              <b>Nav Menu</b>
            </div>

            <div style={{ float: 'right' }}>
              <span>welcome {this.state.currentUser.get('email')}!</span>
              <span>image here</span>
            </div>
          </div>
        </Segment>

        <Tab panes={this.getPanes()}/>

      </div>
    );
  }
}
