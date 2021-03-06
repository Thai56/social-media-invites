import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core/';
import fetchHelpers from '../utils/fetchHelper';
import BusinessReviewModal from './BusinessReviewModal';

const styles = {
  formStyle: {
    width: '500px',
    height: '200px',
    margin: 'auto',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  }
};

const defaultState = {
  name: '',
  address: '',
};
export default class AutoCompleteExampleSimple extends Component {
  state = defaultState;

  handleChange = (e : object) => {
    const { target: { value, name } } = e;
    this.setState(() => ({
      [name]: value,
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, address } = this.state;
    const data = { name, address };
    fetchHelpers.postBusiness(data)
      .then(res => {
        console.log('res.data', res.data);
        return res.data;
      })
      .catch(err => {
        console.error(err);
      });

    this.setState(() => (defaultState));
  }

  render() {
    return (
      <div>
        <h1 style={{ textAlign: 'center' }}>Please Enter info Below</h1>
        <BusinessReviewModal />
        <form
          onSubmit={this.handleSubmit}
          style={styles.formStyle}
        >
          <TextField
            label="Business Title"
            name="name"
            margin="normal"
            value={this.state.name}
            style={{ width: 400 }}
            onChange={this.handleChange}
          />
          <TextField
            label="Address"
            name="address"
            margin="normal"
            value={this.state.address}
            style={{ width: 400 }}
            onChange={this.handleChange}
          />
          <input type="submit" value="submit" />
        </form>
      </div>
    );
  }
}
