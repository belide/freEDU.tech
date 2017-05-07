import React from 'react';
import Header from '../containers/Header'
import './index.css';
import { color, xy, row, b, f1 } from '../helper';

class Lost extends React.Component {
  render() {
    return (
      <div style={{ height: '100vh' }}>
        <Header />
        <div style={{ ...f1, ...xy }}>
          <h1>Page not found!</h1>
        </div>
      </div>
    );
  }
}

export default Lost;
