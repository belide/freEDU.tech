import React from 'react';
import { connect } from 'react-redux';
import { setState } from '../state';
import { Link } from 'react-router-dom'
import Header from './Header';
import { color, xy, row, b, f1, routes } from '../helper';


class Home extends React.Component {
  render() {
    let { state, location } = this.props;
    // let path = location.pathname.split('/').filter(val => val != '');
    // let image = this.getImageFromPath(path);
    // routes[category].route
    return (
      <div>
        <Header />
        <div style={{ ...f1, ...row, flexWrap: 'wrap', justifyContent: 'center', paddingTop: '1rem' }}>
          {Object.keys(routes).map((category, i) => {
            return (
              <Link
                key={i}
                to={routes[category].route}
                >
                <div
                  className="home-category"
                  style={{ ...b, ...xy, margin: '1rem', borderColor: color.r, backgroundImage: `url(${routes[category].image})`, height: '19rem', width: '34rem', backgroundSize: 'cover', backgroundPosition: 'center center' }}
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

  getImageFromPath = arr => {
    if (!arr.length) {
      return null;
    }

    let location = routes;
    for (let i = 0; i < arr.length; i++) {
      location = location[arr[i]]
      if (!location) {
        return window.location.replace('/404')
      }
    }
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Home);
