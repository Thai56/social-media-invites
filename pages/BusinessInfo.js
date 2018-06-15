import React, {Component} from 'react';
import Button from '@material-ui/core/Button';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class AutoCompleteExampleSimple extends Component {
  state = {
    dataSource: [],
  };

  handleUpdateInput = (value) => {
    this.setState({
      dataSource: [
        value,
        value + value,
        value + value + value,
      ],
    });
  };

  render() {
    return (
      <div>
        <Button variant="raised" color="primary">
          Hello World
        </Button>
      </div>
    );
  }
}
