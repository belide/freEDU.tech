import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../state';
import { Link } from 'react-router-dom'
import Header from './Header';
import { color, xy, row, b, f1, routes } from '../helper';


class Home extends React.Component {
  render() {
    let { state, location } = this.props;

    return (
      <div>
        <Header />
        <p>ask</p>
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Home);
