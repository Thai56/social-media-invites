import React from 'react';
import { Segment, Header, Tab, Spinner } from 'semantic-ui-react';
import RegisterView from '../components/RegisterView';

const panes = [
  {
    menuItem: 'Register',
    render: () => <Tab.Pane><RegisterView /></Tab.Pane>,
  },
  {
    menuItem: 'View',
    render: () => <Tab.Pane>View Page</Tab.Pane>,
  },
  {
    menuItem: 'Account',
    render: () => <Tab.Pane>Account Page</Tab.Pane>,
  },
];

export default class Dashboard extends React.Component {
  render() {
    return(
      <div>
        <Segment
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Header id="header-icon">Social Media Invites</Header>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div>
              <b>Nav Menu</b>
            </div>

            <div>
              <span>welcome !</span>
              <span>image here</span>
            </div>
          </div>
        </Segment>

        <Tab panes={panes}/>

      </div>
    );
  }
}
