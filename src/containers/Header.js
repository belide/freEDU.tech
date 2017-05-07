import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { setState } from '../state';
import { color, xy, row, b } from '../helper';
import './index.css';

let web = [
  {
    name: 'Web',
    route: '/web'
  },
  {
    name: 'React',
    route: '/web/React'
  },
  {
    name: 'Algorithms',
    route: '/algorithms'
  },
];

let languages = [
  {
    name: 'Languages',
    route: '/languages'
  },
  {
    name: 'JavaScript',
    route: '/languages/algorithms'
  },
  {
    name: 'C',
    route: '/languages/c'
  },
  {
    name: 'Java',
    route: '/languages/java'
  }
];

let categories = [
  ...web,
  ...languages,
  {
    name: 'Artificial Intelligence',
    route: '/ai'
  },
  {
    name: 'Robotics',
    route: '/robotics'
  },
  {
    name: 'Algorithms',
    route: '/algorithms'
  }
];

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : categories.filter(lang =>
    lang.name.toLowerCase().slice(0, inputLength) === inputValue
  );
};

class Header extends React.Component {
  state = {
    suggestions: [],
    value: ''
  }

  render() {
    let { state } = this.props;
    let { user } = state;

    let inputProps = {
      value: this.state.value,
      placeholder: 'Search',
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    return (
      <div style={{ ...row, height: '4rem', borderBottom: '1px solid black' }}>
        <div style={{ ...row, alignItems: 'center', flex: 2 }}>
          <img
            src={require('../assets/logo.png')}
            style={{ width: '8rem', margin: '1rem' }}
          />
          <Autosuggest
            suggestions={this.state.suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={v => v.name}
            getSuggestions={getSuggestions}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <div style={{ ...xy, flex: 1, alignItems: 'flex-end' }}>
          <p style={{ fontSize: '1.6rem', margin: '1rem' }}>{user ? user.name : 'login'}</p>
        </div>
      </div>
    );
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onBlur = () => this.setState({ value: '' })

  renderSuggestion = v => (
    <div>
      {v.name}
    </div>
  );

  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Header);
