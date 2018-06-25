import React from 'react';
import Link from 'next/link';
import Auth from './Auth';
import Header from '../components/Header';
import {
  Segment,
  Grid,
  Header as SHeader,
  Image,
  Card,
} from 'semantic-ui-react';

import '../styles/main.css';

const auth = new Auth();

const Index = () => (
  <Segment>
    <Header text="Social Media Invites" />
    <Grid style={{ padding: 16 }} columns={2} divided>
      <Grid.Row styles={{ display: 'flex', justifyContent: 'center' }}>
          <Grid.Column width={6}>
            <SHeader>Track your business growth</SHeader>
            <p>lorem epsum backon upasdsa dor salit lor faoe</p>
          </Grid.Column>

          <Grid.Column width={10} id="home-body-image">
          </Grid.Column>
        </Grid.Row>
      </Grid>

      <Grid divided="vertically">
        <Grid.Row columns={3}>
          <Grid.Column>
            <Card className="full-width">
              <Image src="data:image/png;base64,aHR0cHM6Ly9lbmNyeXB0ZWQtdGJuMC5nc3RhdGljLmNvbS9pbWFnZXM/cT10Ym46QU5kOUdjU2x2bTA1OG42UVhEV2RFdDRsc0x0V3hvb0tNeFRuQVU5TDlsLVJUVWt6SHlGWkluQkU=" />
              <Card.Content>
                <Card.Header>HeaderPlaceholder</Card.Header>
                <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card className="full-width">
              <Image src={require('../img/lookingup.png')} />
              <Card.Content>
                <Card.Header>HeaderPlaceholder</Card.Header>
                <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

          <Grid.Column>
            <Card className="full-width">
              <Image src={require('../img/lookingup.png')} />
              <Card.Content>
                <Card.Header>HeaderPlaceholder</Card.Header>
                <Card.Description>Daniel is a comedian living in Nashville.</Card.Description>
              </Card.Content>
            </Card>
          </Grid.Column>

        </Grid.Row>

      </Grid>
  </Segment>
)

export default Index
