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
        <div style={{ ...f1, ...row, flexWrap: 'wrap', justifyContent: 'center', paddingTop: '1rem' }}>
          {Object.keys(routes).map((category, i) => {
            return (
              <Link
                key={i}
                to={`${routes[category].route}/posts`}
                >
                <div
                  className="category"
                  style={{ ...b, ...xy, margin: '1rem', borderColor: color.r, backgroundImage: `url(${routes[category].image})`, height: '19rem', width: '34rem' }}
                  >
                  <h1>{routes[category].name}</h1>
                </div>
              </Link>
            );
          })}
          <div style={{ margin: '1rem', width: '34rem' }}></div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Home);
