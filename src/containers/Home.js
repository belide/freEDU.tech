import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../state';
import { color } from '../helper';
import Header from './Header';

class Home extends React.Component {
  render() {
    let { state } = this.props;
    return (
      <div style={{ height: '100vw' }}>
        <Header />
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Home);
