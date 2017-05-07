import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../state';
import { colors } from '../helper';

class Header extends React.Component {
  render() {
    let { state } = this.props;
    return (
      <div style={{ height: '6rem', borderBottom: '1px solid black' }}>

      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Header);
