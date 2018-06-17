import React from 'react'
import {
  Button,
  Header,
  Image,
  Modal,
  Checkbox,
  Loader,
  Dimmer,
} from 'semantic-ui-react'
import { fromJS } from 'immutable';
import fetchHelpers from '../utils/fetchHelper';

class ModalExampleTopAligned extends React.Component {
  state={
    businesses: fromJS([]),
    stateBeforeSave: fromJS([]),
    isFetching: false,
  }

  componentDidMount() {
    this.fetchBusinesses();
    const { businesses } = this.state;
  }

  fetchBusinesses = () => {
    this.setState(() => ({ isFetching: true }));
    fetchHelpers.getAllBusinesses()
      .then(({ data }) => {
        this.setState(() => ({
          businesses: fromJS(data),
          isFetching: false,
          stateBeforeSave: fromJS(data),
        }))
      })
      .catch(err => console.error(err));
  }

  onChange = (id, isChecked) => {
    const { businesses } = this.state;
    const newState = businesses.update(
      businesses.findIndex(business => business.get('_id') === id),
      (item) => {
        console.log('item ', item);
        return item.set('watching', isChecked)
      },
    );

    this.setState(() => ({
      businesses: newState,
    }));
  }

  handleSave = () => {
    const { businesses, stateBeforeSave } = this.state;
    console.log('before', stateBeforeSave)
    console.log('newest ', businesses);
    const newChanges = businesses.filter(business => {
      const index = stateBeforeSave.findIndex(map => {
        return map.get('_id') === business.get('_id'); 
      });
      console.log('index ', index);
      return !stateBeforeSave.get(index).equals(business);
    });
  }

  render(){
    return (
      <Modal
        trigger={<Button>Show Modal</Button>}
        centered={false}
      >
      <Modal.Header>Review Settings</Modal.Header>
      {
        this.state.isFetching
        ?
        <Loader>Loading</Loader>
        :
        <Modal.Content image>
          <Modal.Description>
            <Header>Businesses</Header>
            <BusinessDisplayer
              businesses={this.state.businesses}
              onChange={this.onChange}
            />
            </Modal.Description>
        </Modal.Content>
      }
        <section style={{ float: 'right', padding: 12 }}>
          <Button onClick={this.handleSave} style={{ marginRight: 8 }}>Cancel</Button>
          <Button primary>Save</Button>
        </section>
      </Modal>
    );
  }
};

function BusinessDisplayer({ businesses, onChange }) {
  if (!businesses.size) {
    return <Header>There are currently no businesses to watch</Header>
  }
  return businesses.map((business, i) => {
    return (
      <div
        key={i}
        style={{
          display: 'flex',
          justifyContent:'space-between',
        }}
      >
       <ul>
        <li>Name: {business.get('name')}</li>
        <li>Address: {business.get('address')}</li>
       </ul>
        <Checkbox
          checked={business.get('watching', false)}
          onChange={(e, { checked }) => {
            onChange(business.get('_id'), checked);
          }}
          toggle
        />
      </div>
    )
  });
}

export default ModalExampleTopAligned
