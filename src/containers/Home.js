import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../state';
import { colors } from '../helper';

class Home extends React.Component {
  render() {
    let { state } = this.props;
    return (
      <div>
        hi
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Home);
