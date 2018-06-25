import React from 'react';
import { OrderedList } from './RegisterView';
import { Button } from 'semantic-ui-react';
import { fromJS } from 'immutable';

interface BusinessesProps {
  user: object,
}

export default class BusinessesView extends React.Component<BusinessesProps> {
  state = {
    copied: fromJS({}),
  }
  copyToClipBoard = (url: string, placeId: string) => {
    console.log(url, navigator);
    navigator.clipboard.writeText(url)
      .then(() => {
        console.log('SUCESSFULLY COPIED');
        this.setState(({ copied }) => ({ copied: copied.set(placeId, placeId) }));
        setTimeout(() => {
            console.log('setting state ', this.setState);
            this.setState(({ copied }) => ({ copied: copied.delete(placeId) }))
          }, 3000)
      })
      .catch(err => console.error(err));
  }
  
  render() {
    console.log('Props ', this.props.user);
    const { businesses } = this.props;
    return (
      <OrderedList> 
        {
          businesses.map((b, i) => {
            return (
              <div key={i} style={{ padding: 60 }}>
                <b>{b.get('name')}</b>
                <br />
                <span>{b.get('formatted_address')}</span>
                <Button 
                  style={{ width: 165, float: 'right' }} 
                  onClick={() => this.copyToClipBoard(b.get('reviewUrl'), b.get('place_id'))}
                  >
                  {this.state.copied.has(b.get('place_id')) ? 'Copied!' : 'Copy to Clipboard'}
                </Button>
              </div>
            ); 
          })
        }
      </OrderedList> 
    );
  }
}
