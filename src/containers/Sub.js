import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { setState } from '../state';
import { color, xy, row, b, f1, routes } from '../helper';
import './index.css';
import Header from './Header';

class Sub extends React.Component {
  render() {
    let { state } = this.props;
    let { user, suggestions, search } = state;

    return (
      <div style={f1}>
        <Header />
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Sub);
