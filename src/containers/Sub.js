import React from 'react';
import SimpleSpamFilter from 'simple-spam-filter';
import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { setState } from '../state';
import { color, xy, row, b, f1, routes, font } from '../helper';
import './index.css';
import Header from './Header';

var opts = {
    minWords: 5,
    maxPercentCaps: 30,
    maxNumSwearWords: 2
}

var filter = new SimpleSpamFilter(opts)

class Sub extends React.PureComponent {
  state = {
    subsVisible: false,
    mode: 'posts',
    title: '',
    link: '',
    question: '',
    details: '',
    inputVisible: false,
    posts: {},
    qa: {},
    answer: '',
    activeAnswerId: null
  }

  componentDidMount() {
    let { location } = this.props;
    let path = location.pathname.split('/').filter(val => val != '' && val != 'answer');
    this.getImageFromPath(path);
  }

  render() {
    let { mode, details, title, question, link } = this.state;
    let { state, location } = this.props;
    let { user, suggestions, search, routeInfo } = state;

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
        {this.renderSubCategories(mode)}
        <div style={{ ...row, alignItems: 'flex-start', justifyContent: 'flex-end' }}>
          {this.renderInput(mode)}
          {this.renderButton(mode)}
        </div>
        {this.renderPosts(mode)}
      </div>
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname.length !== this.props.location.pathname.length) {
      console.log('back!')
      this.getImageFromPath(this.props.location.pathname.split('/').filter(val => val != '' && val != 'answer'));
    }
  }

  renderSubCategories = mode => {
    if (mode != 'sub') {
      return null;
    }

    let { routeInfo } = this.props.state;

    return (
      <div style={{ ...row }}>
        <div style={{ ...f1, ...row, flexWrap: 'wrap', justifyContent: 'center' }}>
          {routeInfo.sub ? Object.keys(routeInfo.sub).map((category, i) => {
            return (
              <Link
                key={i}
                to={routeInfo.sub[category].route}
                onClick={() => {
                  console.log('routeInfo.sub[category].route')
                  this.getImageFromPath(routeInfo.sub[category].route.split('/').filter(val => val != '' && val != 'answer'));
                }}
                className="sub category"
                style={{ ...xy, height: '15rem', width: '20rem', margin: '3rem', backgroundImage: `url(${routeInfo.sub[category].image})` }}
                >
                <h1>{routeInfo.sub[category].name}</h1>
              </Link>
            );
          }) : null}
          <div style={{ ...xy, height: '15rem', width: '20rem', margin: '3rem'}}></div>
        </div>
      </div>
    );
  }

  connectToFirebase = routeInfo => {
    let { mode } = this.state;
    this.root = firebase.database().ref(routeInfo.route);

    this.root.child('posts').on('value', snap => {
      this.setState({ posts: snap.val() || {} })
    })

    this.root.child('qa').on('value', snap => {
      this.setState({ qa: snap.val() || {} });
    })
  }

  renderPosts = mode => {
    if (mode === 'sub') {
      return null;
    }

    if (mode === 'posts') {
      return (
        <div style={{ alignSelf: 'center' }}>
          {Object.keys(this.state[mode]).reverse().map(key => {
            return (
              <div key={key} style={{ ...row, ...xy, justifyContent: 'flex-start' }}>
                <div
                  onClick={() => this.root.child(mode).update({ [key]: { ...this.state[mode][key], votes: this.state[mode][key].votes + 1 } })}
                  className="upvote"
                  style={{ ...xy, ...row }}
                  >
                  <img
                    style={{ height: '14px', width: '14px', marginRight: '5px' }}
                    src={require('../assets/triangle.png')}
                  />
                  <p style={font.r}>{this.state[mode][key].votes}</p>
                </div>
                <a target="_blank" href={this.state[mode][key].link}>
                  <p style={{ ...font.e, color: color.q }}>{this.state[mode][key].title}</p>
                </a>
              </div>
            );
          })}
        </div>
      );
    }
    return (
      <div style={{ alignSelf: 'center' }}>
        {Object.keys(this.state[mode]).reverse().map(key => {
          return (
            <div key={key}>
              <div style={{ ...row, alignItems: 'center', justifyContent: 'flex-start', width: '60vw' }}>
                <div
                  onClick={() => this.root.child(mode).update({ [key]: { ...this.state[mode][key], votes: this.state[mode][key].votes + 1 } })}
                  className="upvote"
                  style={{ ...xy, ...row }}
                  >
                  <img
                    style={{ height: '14px', width: '14px', marginRight: '5px' }}
                    src={require('../assets/triangle.png')}
                  />
                  <p style={font.r}>{this.state[mode][key].votes}</p>
                </div>
                <div
                  style={{ maxWidth: '75vw', cursor: 'pointer' }}
                  onClick={() => this.expandAnswers()}
                  >
                  <p style={{ ...font.e, color: color.q }}>{this.state[mode][key].question}</p>
                  <p style={{ ...font.t, color: color.q }}>{this.state[mode][key].details || ''}</p>
                </div>
              </div>
              {Object.keys(this.state[mode][key].answers || {}).map((answerID, i) => {
                return (
                  <div key={i} style={{ width: '50vw' }}>
                    <p style={{ ...font.r, marginLeft: '7rem' }}>&#8226; {this.state[mode][key].answers[answerID]}</p>
                  </div>
                );
              })}
              {this.state.activeAnswerId === key ? (
                <textarea
                  style={{ ...font.e, minHeight: '3rem', padding: '0.2rem', width: '50vw', margin: '0.5rem 3rem', resize: 'vertical' }}
                  placeholder="Answer"
                  value={this.state.answer}
                  onChange={({ target }) => this.setState({ answer: target.value })}
                />
              ) : null}
              <div
                onClick={() => {
                  if (!this.state.activeAnswerId) {
                    return this.setState({ activeAnswerId: key });
                  }
                  if (this.state.answer.length > 0) {
                    if (filter.isSpam(this.state.answer)) {
                      return console.log('troll detected!');
                    }
                    this.root.child(`${mode}/${key}/answers`).push(this.state.answer);
                    this.setState({ answer: '', activeAnswerId: null });
                  }
                }}
                style={{ alignSelf: 'flex-end', backgroundColor: color.e, padding: '0.6rem 1.7rem', margin: '1rem', cursor: 'pointer', userSelect: 'none' }}
                >
                <p style={{ ...font.t, color: 'white' }}>Answer</p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  expandAnswers = () => {

  }

  getImageFromPath = arr => {
    console.log('ARR', arr)
    if (!arr.length) {
      return null;
    }

    let location = routes;
    for (let i = 0; i < arr.length; i++) {
      location = location.sub[arr[i]]
      console.log('LOCATION!', location)
      if (!location) {
        return window.location.replace('/404')
      }
    }
    this.props.setState({ routeInfo: location })
    this.connectToFirebase(location);
  }

  renderInput = mode => {
    let { title, question, link, details, inputVisible } = this.state;

    if (mode === 'sub' || !inputVisible) {
      return null;
    }


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
        onClick={() => this.post(mode)}
        style={{ backgroundColor: color.e, padding: '1rem 2rem', margin: '1rem', cursor: 'pointer', userSelect: 'none' }}
        >
        <p style={{ ...font.r, color: 'white' }}>{this.state.inputVisible ? 'Submit' : (mode === 'posts' ? 'Post Link' : 'Ask Question')}</p>
      </div>
    );
  }

  post = mode => {
    if (this.state.inputVisible) {
      // if (snap.val() === null) {
      //   console.log('updating')
      //   root.update({
      //     links: [],
      //     questions: []
      //   });
      // }
      let { details, title, question, link } = this.state;

      let data;

      if (mode === 'posts') {
        data = {
          title,
          link,
          votes: 0
        };

        this.setState({ title: '', link: '' });
      } else {
        data = {
          question,
          details,
          votes: 0
        };

        this.setState({ question: '', details: '' });
      }

      if ((mode === 'posts' && title.length > 0 && link.length > 0) || (mode === 'qa' && question.length > 0)) {
        this.root.child(mode).push(data);
      }

      return this.setState({ inputVisible: false });
    }

    return this.setState({ inputVisible: true });
  }
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Sub);
