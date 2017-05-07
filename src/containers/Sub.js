import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { setState } from '../state';
import { color, xy, row, b, f1, routes } from '../helper';
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
    console.log('this.state.subsVisible', this.state.subsVisible)
    let { state, location } = this.props;
    let { user, suggestions, search, routeInfo } = state;

    let subButton = routeInfo.sub ? (
      <div style={{ ...xy, height: '8rem', width: '20rem' }}>
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
        <div style={{ width: '100vw', height: '20rem', backgroundImage: `url(${routeInfo.image})`}}>

        </div>
        <div style={{ ...row }}>
          {subButton}
          <div style={{ ...f1, ...row, flexWrap: 'wrap' }}>
            {routeInfo.sub ? Object.keys(routeInfo.sub).map((category, i) => {
              return (
                <Link
                  key={i}
                  to={routeInfo.sub[category].route}
                  >
                  <div
                    className={`sub category ${this.state.subsVisible ? 'visible' : ''}`}
                    style={{ ...xy, width: '20rem', backgroundImage: `url(${routeInfo.sub[category].image})` }}
                    >
                    <h1>{routeInfo.sub[category].name}</h1>
                  </div>
                </Link>
              );
            }) : null}
          </div>
        </div>
        {this.renderQuestions()}
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
    this.props.setState({ routeInfo: location })
  }

  renderQuestions = () => {
    return null;
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Sub);
