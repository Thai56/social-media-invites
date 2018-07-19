import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { Input, Button, Loader } from 'semantic-ui-react';
import Immutable, { fromJS } from 'immutable';
// import Router from 'next/router'

import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

import constants from '../utils/constants';
import fetchHelpers from '../utils/fetchHelper';
import registerUtils from '../utils/registerUtils';

import '../styles/main.css';

const { mapIdAsKey } = registerUtils;

const { postBusiness, getUserBusinesses } = fetchHelpers;

const { CURRENT_USER } = constants;

const RegisterContainer = styled.div`
  height: 30vh;
  width: 100%;
  position: relative;
`;

export const OrderedList = styled.ol`
  position: absolute;
  width: 100%;
  top: 100%;
  padding-top: 20;
`;

export default class RegisterView extends React.PureComponent<{}, {
  businesses: Immutable.Map,
}> {
  state={ isLoading: false } 

  render() {
    if (!this.props.businesses.size) return (
      <div>
        <b>Please save something by looking up a place and saving it in Register Tab</b>
        <Loader />
      </div>
    );
    return (
      <RegisterContainer className="hero-image">
      <PlacesWithStandaloneSearchBox 
        businesses={this.props.businesses} 
        savePlace={this.props.savePlace}
      />
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
        placeholder="Enter your business name or address"
        style={{
          boxSizing: `border-box`,
          position: `absolute`,
          top: `15%`,
          left: `33%`,
          border: `1px solid transparent`,
          width: `264px`,
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
    <OrderedList>
      {props.places.map((place, i) => {
        const { name, place_id, formatted_address, geometry: { location } } = place;
        return (
          <div key={i} style={{ padding: 24 }}>
            <li key={place_id} style={{ float: 'left' }}>
              <b>{name}</b>
              <br />
              <span>{formatted_address}</span>
            </li>
            <Button
              positive
              style={{ float: 'right', marginLeft: 16 }}
              onClick={() => props.savePlace(place)}
              disabled={!!props.businesses.has(place_id)}
             >
              Save
            </Button>
          </div>
          );
        })
      }
    </OrderedList>
  </div>
);

<PlacesWithStandaloneSearchBox />
