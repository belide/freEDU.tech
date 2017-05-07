import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { setState } from '../state';
import { color, xy, row, b, f1, routes, font } from '../helper';
import './index.css';
import Header from './Header';

class Sub extends React.Component {
  state = {
    subsVisible: false
  }

  componentWillMount() {
    let { location } = this.props;
    let path = location.pathname.split('/').filter(val => val != '');
    this.getImageFromPath(path);
  }

  render() {
    let { state, location } = this.props;
    let { user, suggestions, search, routeInfo } = state;

    let subButton = routeInfo.sub ? (
      <div style={{ ...xy, height: '8rem', width: '8rem' }}>
        <div
          className="show-sub"
          onClick={() => this.setState({ subsVisible: !this.state.subsVisible })}
          style={{ ...xy, backgroundColor: color.w }}
          >
          <img
            src={require('../assets/lightMore.png')}
            style={{ width: '2.5rem' }}
          />
        </div>
      </div>
    ) : null;

    return (
      <div style={f1}>
        <Header />
        <div style={{ width: '100vw', height: '20rem', backgroundImage: `url(${routeInfo.image})`}}></div>
        <div style={{ ...row, alignItems: 'center', justifyContent: 'space-between', padding: '0 3rem', backgroundColor: color.w }}>
          <div style={f1}>
            <p style={{ ...font.r, color: 'white' }}>{routeInfo.name}</p>
          </div>
          <div style={{ ...row, flex: 2 }}>
            <div style={{ ...f1, ...xy, padding: '0.5rem', borderBottom: location.pathname.indexOf('posts') !== -1 ? `5px solid ${color.q}` : null }}>
              <Link to={`${routeInfo.route}/posts`}>
                <p style={{ ...font.r, color: 'white' }}>Posts</p>
              </Link>
            </div>
            <div style={{ ...f1, ...xy, padding: '0.5rem', borderBottom: location.pathname.indexOf('qa') !== -1 ? `5px solid ${color.q}` : null }}>
              <Link to={`${routeInfo.route}/qa`}>
                <p style={{ ...font.r, color: 'white' }}>Q & A</p>
              </Link>
            </div>
            <div style={{ ...f1, ...xy, padding: '0.5rem', borderBottom: location.pathname.indexOf('sub') !== -1 ? `5px solid ${color.q}` : null }}>
              <Link to={`${routeInfo.route}/sub`}>
                <p style={{ ...font.r, color: 'white' }}>Sub Categories</p>
              </Link>
            </div>
          </div>
          <div style={f1}></div>
        </div>
        {this.renderButton()}
        <div style={{ ...row }}>
          {/* <div style={{ ...row, ...xy, height: '6rem', flex: 0.1 }}>
            {subButton}
          </div> */}
          <div style={{ ...f1, ...row, flexWrap: 'wrap' }}>
            {routeInfo.sub ? Object.keys(routeInfo.sub).map((category, i) => {
              return (
                <Link
                  key={i}
                  to={routeInfo.sub[category].route}
                  className={`sub category ${this.state.subsVisible ? 'visible' : ''}`}
                  style={{ ...xy, width: '20rem', backgroundImage: `url(${routeInfo.sub[category].image})` }}
                  >
                  <h1>{routeInfo.sub[category].name}</h1>
                </Link>
              );
            }) : null}
          </div>
        </div>
      </div>
    );
  }

  getImageFromPath = arr => {
    if (!arr.length) {
      return null;
    }

    let location = routes;
    for (let i = 0; i < arr.length - 1; i++) {
      location = location[arr[i]]
      if (!location) {
        return window.location.replace('/404')
      }
    }
    this.props.setState({ routeInfo: location })
  }

  renderButton = () => {
    return (
      <div style={{ backgroundColor: color.e, padding: '1rem 2rem', margin: '1rem', alignSelf: 'flex-end' }}>
        <p style={{ ...font.r, color: 'white' }}>Post Link</p>
      </div>
    );
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Sub);
