import React from 'react';
import Autosuggest from 'react-autosuggest';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { setState } from '../state';
import { color, xy, row, b, f1 } from '../helper';
import './index.css';

let web = [
  {
    name: 'Web',
    route: '/web'
  },
  {
    name: 'Front End',
    route: '/web/frontend'
  },
  {
    name: 'React',
    route: '/web/frontend/react'
  },
  {
    name: 'Angular',
    route: '/web/frontend/angular'
  },
  {
    name: 'Polymer',
    route: '/web/frontend/polymer'
  },
  {
    name: 'Games',
    route: '/web/games'
  },
  {
    name: 'Phaser',
    route: '/web/games/phaser'
  },
  {
    name: 'Unity Web',
    route: '/web/games/unity'
  },
  {
    name: 'Back End',
    route: '/web/backend'
  },
  {
    name: 'Node',
    route: '/web/backend/node'
  },
  {
    name: 'Express',
    route: '/web/backend/node/express'
  }
];

let languages = [
  {
    name: 'Languages',
    route: '/languages'
  },
  {
    name: 'JavaScript',
    route: '/languages/javascript'
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

let databases = [
  {
    name: 'Databases',
    route: '/databases'
  },
  {
    name: 'SQL',
    route: '/sql'
  },
  {
    name: 'NoSQL',
    route: '/nosql'
  },
  {
    name: 'MongoDB',
    route: '/nosql/mongodb'
  },
  {
    name: 'DynamoDB',
    route: '/nosql/dynamodb'
  },
];

let algorithms = [
  {
    name: 'Algorithms',
    route: '/algorithms'
  },
  {
    name: 'Trees',
    route: '/algorithms/trees'
  },
  {
    name: 'Sorting',
    route: '/algorithms/sorting'
  },
  {
    name: 'Bubble Sort',
    route: '/algorithms/sorting/bubble'
  },
  {
    name: 'Bucket Sort',
    route: '/algorithms/sorting/bucket'
  },
  {
    name: 'Insertion Sort',
    route: '/algorithms/sorting/insertion'
  },
  {
    name: 'MergeSort',
    route: '/algorithms/sorting/merge'
  },
  {
    name: 'Heapsort',
    route: '/algorithms/sorting/heap'
  },
];

let categories = [
  ...web,
  ...languages,
  ...algorithms,
  ...databases,
  {
    name: 'Artificial Intelligence',
    route: '/ai'
  },
  {
    name: 'Robotics',
    route: '/robotics'
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
  render() {
    let { state } = this.props;
    let { user, suggestions, search } = state;

    let inputProps = {
      value: search,
      placeholder: 'Search',
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    return (
      <div style={{ ...row, backgroundColor: color.q, height: '4rem', borderBottom: `1px solid ${color.q}`, padding: '0 3rem' }}>
        <div style={{ ...row, alignItems: 'center', flex: 2 }}>
          <Link to="/">
            <img
              src={require('../assets/lightLogo.png')}
              style={{ width: '8rem' }}
            />
          </Link>
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={v => v.name}
            getSuggestions={getSuggestions}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
          />
        </div>
        <div style={{ ...xy, flex: 1, alignItems: 'flex-end' }}>
          <p style={{ fontSize: '1.6rem', color: 'white' }}>{user ? user.name : 'login'}</p>
        </div>
      </div>
    );
  }

  onChange = (event, { newValue, method }) => {
    if (method === 'click') {
      let item = categories.filter(obj => obj.name === newValue)[0]; // what is efficiency?
      // console.log('ITEM', item)
      window.location.replace(item.route)
    }

    this.props.setState({
      search: newValue
    });
  };

  onBlur = () => this.props.setState({ search: '' })

  renderSuggestion = v => (
    <div>
      {v.name}
    </div>
  );

  onSuggestionsFetchRequested = ({ value }) => {
    this.props.setState({
      suggestions: getSuggestions(value)
    });
  }

  onSuggestionsClearRequested = () => {
    this.props.setState({
      suggestions: []
    });
  };
}

export default connect(
  state => ({ state }),
  dispatch => ({ setState: state => dispatch(setState(state)) })
)(Header);
