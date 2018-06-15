import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

/**
 * The input is used to create the `dataSource`, so the input always matches three entries.
 */
export default class AutoCompleteExampleSimple extends Component {

  static defaultProps = {
    style: {},
    onClick: () => {},
  }
  static propTypes = {
    style: PropTypes.object,
    onClick: PropTypes.func,
    color: PropTypes.string,
  }

  render() {
    return (
      <Button 
        style={this.props.style || {}} 
        onClick={this.props.onClick} 
        variant="raised" 
        color={this.props. color || "primary"}
      >
        {this.props.children} 
      </Button>
    );
  }
}
