import React from 'react';
import styled from 'styled-components';
import { Input, Button, Loader } from 'semantic-ui-react';
import Immutable, { fromJS } from 'immutable';
import Router from 'next/router'

import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import constants from '../utils/constants';
import fetchHelpers from '../utils/fetchHelper';
import registerUtils from '../utils/registerUtils';

const { mapIdAsKey } = registerUtils;

const { postBusiness, getUserBusinesses } = fetchHelpers;

const { CURRENT_USER } = constants;

const RegisterContainer = styled.div`
  height: 400px;
  width: 100%;
`;

const SearchControlWrapper = styled.div`
  width: 30%;
  display: flex;
  margin: auto;
  margin-top: 11vh;
`;

export default class RegisterView extends React.Component<{}, {
  businesses: Immutable.Map,
}> {
  state={
    businesses: fromJS([{}]),
    currentUser: '',
    isLoading: false,
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
          console.log('data ', data);
          this.setState(() => ({
            currentUser,
            businesses: mapIdAsKey(fromJS(['place_id']), fromJS(data)),
            isLoading: false,
          }));
        });
    }
  }

  savePlace = (place) => {
    const { businesses } = this.state;
    console.groupCollapsed('businesses ', businesses);
    console.groupEnd();

    this.setState(() => ({
      businesses: mapIdAsKey(
        fromJS(['place_id']),
        businesses.set(fromJS(place).get('place_id'), fromJS(place)),
      ),
    }));

    if (!this.state.businesses.get(place.place_id)) {
      console.log('no have this id ', place.place_id);
      postBusiness(fromJS(place).set('user_id', this.state.currentUser.get('_id')))
        .then(({ data }) => {
          console.log('data ', fromJS(data));
          this.setState(() => ({
            businesses: mapIdAsKey(fromJS(['place_id']), fromJS(data)),
          }));
        })
        .catch(() => console.error(err));
    }
  }

  render() {
    if (this.state.isLoading) return <Loader />;
    return (
      <RegisterContainer>
        <SearchControlWrapper>
          <PlacesWithStandaloneSearchBox businesses={this.state.businesses} savePlace={this.savePlace}/>
        </SearchControlWrapper>
      </RegisterContainer>
    );
  }
}

const PlacesWithStandaloneSearchBox = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        places: [],
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();

          this.setState({
            places,
          });
        },
      })
    },
  }),
  withScriptjs
)(props =>
  <div data-standalone-searchbox="">
    <StandaloneSearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </StandaloneSearchBox>
    <ol>
  {props.places.map((place, i) => {
    const { name, place_id, formatted_address, geometry: { location } } = place;
    console.log(props.businesses.has(place_id));
    console.log('props ', props.businesses);
    return (
      <div
        key={i}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 16,
        }}
      >
        <li key={place_id}>
          <b>{name}</b>
          <br />
          <span>{formatted_address}</span>
        </li>
        <Button
          positive
          onClick={() => props.savePlace(place)}
          disabled={!!props.businesses.get(place_id)}
         >
          Save
        </Button>
      </div>
    );
  })
  }
    </ol>
  </div>
);

<PlacesWithStandaloneSearchBox />
