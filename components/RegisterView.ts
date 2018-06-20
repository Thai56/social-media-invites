import React from 'react';
import styled from 'styled-components';
import { Input, Button } from 'semantic-ui-react';
import Immutable, { fromJS } from 'immutable';

import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs } from 'react-google-maps';
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';
import fetchHelper from '../utils/fetchHelper';


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

const SearchInput = styled(Input)`
  margin-right: 4px;
`;

export default class RegisterView extends React.Component<{}, {
  businesses: Immutable.Map,
}> {
  state={ businesses: fromJS({}) }

  savePlace = (place) => {
    console.log('SAVING ', place);
    const { businesses } = this.state;

    this.setState(() => ({
      businesses: businesses.set(fromJS(place).get('place_id'), fromJS(place)),
    }), fetchHelper.postBusiness({}));
  }

  render() {
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
  {props.places.map((place) => {
    const { name, place_id, formatted_address, geometry: { location } } = place;
    console.log(place);
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
        <li key={place_id}>
          <b>{name}</b>
          <br />
          <span>{formatted_address}</span>
        </li>
        <Button 
          positive
          disabled={props.businesses.get(place_id)}
          onClick={() => props.savePlace(place)}
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
