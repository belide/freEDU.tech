import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { setState } from '../state';
import { color, xy, row, b, f1, routes, font } from '../helper';
import './index.css';
import Header from './Header';

class Sub extends React.Component {
  state = {
    subsVisible: false,
    mode: 'posts',
    mainInput: '',
    details: '',
    title: '',
    link: '',
    question: '',
    details: ''
  }

  componentWillMount() {
    let { location } = this.props;
    let path = location.pathname.split('/').filter(val => val != '');
    this.getImageFromPath(path);
  }

  render() {
    let { mode, mainInput, details, title, question, link } = this.state;
    let { state, location } = this.props;
    let { user, suggestions, search, routeInfo } = state;

    let subCategories = mode === 'sub' ? (
      <div style={{ ...row }}>
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
    ) : null;

    // let subButton = routeInfo.sub ? (
    //   <div style={{ ...xy, height: '8rem', width: '8rem' }}>
    //     <div
    //       className="show-sub"
    //       onClick={() => this.setState({ subsVisible: !this.state.subsVisible })}
    //       style={{ ...xy, backgroundColor: color.w }}
    //       >
    //       <img
    //         src={require('../assets/lightMore.png')}
    //         style={{ width: '2.5rem' }}
    //       />
    //     </div>
    //   </div>
    // ) : null;

    return (
      <div style={f1}>
        <Header />
        <div style={{ width: '100vw', height: '20rem', backgroundImage: `url(${routeInfo.image})`}}></div>
        <div style={{ ...row, alignItems: 'center', justifyContent: 'space-between', padding: '0 3rem', backgroundColor: color.w }}>
          <div style={f1}>
            <p style={{ ...font.r, color: 'white' }}>{routeInfo.name}</p>
          </div>
          <div style={{ ...row, flex: 2 }} className="mode-picker">
            <div style={{ ...f1, ...xy, padding: '0.5rem', borderBottom: mode === 'posts' ? `5px solid ${color.q}` : null }}>
              <p
                style={{ ...font.r, color: 'white' }}
                onClick={() => this.setState({ mode: 'posts' })}
                >
                Posts
              </p>
            </div>
            <div style={{ ...f1, ...xy, padding: '0.5rem', borderBottom: mode === 'qa' ? `5px solid ${color.q}` : null }}>
              <p
                style={{ ...font.r, color: 'white' }}
                onClick={() => this.setState({ mode: 'qa' })}
                >
                Q & A
              </p>
            </div>
            <div style={{ ...f1, ...xy, padding: '0.5rem', borderBottom: mode === 'sub' ? `5px solid ${color.q}` : null }}>
              <p
                style={{ ...font.r, color: 'white' }}
                onClick={() => this.setState({ mode: 'sub' })}
                >
                Sub Categories
              </p>
            </div>
          </div>
          <div style={f1}></div>
        </div>
        {subCategories}
        <div style={{ ...row, alignItems: 'flex-start' }}>
          {this.renderInput(mode)}
          {this.renderButton(mode)}
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
    this.props.setState({ routeInfo: location })
  }

  renderInput = mode => {
    if (mode === 'sub') {
      return null;
    }

    let { title, question, link, details } = this.state;

    let detailsInput = mode === 'posts' ? (
      <input
        style={{ ...font.e, height: '3rem', padding: '0.2rem', width: '70vw', margin: '0.5rem 3rem' }}
        placeholder="Link"
        value={link}
        onChange={({ target }) => this.setState({link: target.value})}
      />
    ) : (
      <textarea
        style={{ ...font.e, minHeight: '3rem', padding: '0.2rem', width: '70vw', margin: '0.5rem 3rem', resize: 'vertical' }}
        placeholder={mode === 'posts' ? 'Link' : 'Details'}
        value={details}
        onChange={({ target }) => this.setState({details: target.value})}
      />
    );

    return (
      <div style={{ marginTop: '0.5rem' }}>
        <input
          style={{ ...font.e, height: '3rem', padding: '0.2rem', width: '70vw', margin: '0.5rem 3rem' }}
          placeholder={mode === 'posts' ? 'Title' : 'Question'}
          value={mode === 'posts' ? title : question}
          onChange={({ target }) => this.setState({[mode === 'posts' ? 'title' : 'question']: target.value})}
        />
        {detailsInput}
      </div>
    );
  }

  renderButton = mode => {
    if (mode === 'sub') {
      return null;
    }

    return (
      <div
        onClick={this.post(mode)}
        style={{ backgroundColor: color.e, padding: '1rem 2rem', margin: '1rem', cursor: 'pointer', userSelect: 'none' }}
        >
        <p style={{ ...font.r, color: 'white' }}>{mode === 'posts' ? 'Post Link' : 'Ask Question'}</p>
      </div>
    );
  }

  post = mode => {
    if (mode === 'posts') {

    }
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Sub);
