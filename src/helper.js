const color = {
  q: '#133C55',
  w: '#386FA4',
  e: '#59A5D8',
  r: '#84D2F6',
  t: '#CEE5F2'
};

const font = {
  q: { fontSize: '2.5rem' },
  w: { fontSize: '2.2rem' },
  e: { fontSize: '1.9rem' },
  r: { fontSize: '1.6rem' },
  t: { fontSize: '1.3rem' },
}

const xy = {
  justifyContent: 'center',
  alignItems: 'center'
};

const b = {
  border: '1px solid black'
};

const row = {
  flexDirection: 'row'
};

const f1 = { flex: 1 };

let routes = { // '/'
  web: {
    image: require('./assets/web.png'),
    name: 'Web',
    route: '/web',
    sub: {
      games: {
        image: require('./assets/webGames.png'),
        name: 'Games',
        route: '/web/games',
        sub: {
          phaser: {
            image: require('./assets/phaser.png'),
            name: 'Phaser',
            route: '/web/games/phaser'
          },
          unity: {
            image: require('./assets/unityWeb.png'),
            name: 'Unity Web',
            route: '/web/games/unity'
          }
        }
      },
      frontend: {
        image: require('./assets/frontend.png'),
        name: 'Front End',
        route: '/web/frontend',
        sub: {
          react: {
            image: require('./assets/react.png'),
            name: 'React',
            route: '/web/frontend/react'
          },
          angular: {
            image: require('./assets/angular.png'),
            name: 'Angular',
            route: '/web/frontend/angular'
          },
          polymer: {
            image: require('./assets/polymer.png'),
            name: 'Polymer',
            route: '/web/frontend/polymer'
          }
        }
      },
      backend: {
        image: require('./assets/backend.png'),
        name: 'Back End',
        route: '/web/backend',
        sub: {
          node: {
            image: require('./assets/node.png'),
            name: 'Node',
            route: '/web/backend/node',
            sub: {
              express: {
                image: require('./assets/express.png'),
                name: 'Express',
                route: '/web/backend/node/express'
              }
            }
          }
        }
      }
    }
  },
  algorithms: {
    image: require('./assets/algorithms.png'),
    name: 'Algorithms',
    route: '/algorithms',
    sub: {
      trees: {
        image: require('./assets/trees.png'),
        name: 'Trees',
        route: '/algorithms/trees'
      },
      sorting: {
        image: require('./assets/sorting.png'),
        name: 'Sorting',
        route: '/algorithms/sorting',
        sub: {
          bubble: {
            image: require('./assets/bubble.png'),
            name: 'Bubble Sort',
            route: '/algorithms/sorting/bubble'
          },
          bucket: {
            image: require('./assets/bucket.png'),
            name: 'Bucket Sort',
            route: '/algorithms/sorting/bucket'
          },
          insertion: {
            image: require('./assets/insertion.png'),
            name: 'Insertion Sort',
            route: '/algorithms/sorting/insertion'
          },
          merge: {
            image: require('./assets/merge.png'),
            name: 'MergeSort',
            route: '/algorithms/sorting/merge'
          },
          heap: {
            image: require('./assets/heap.png'),
            name: 'Heapsort',
            route: '/algorithms/sorting/heap'
          }
        }
      }
    }
  },
  databases: {
    image: require('./assets/databases.png'),
    name: 'Databases',
    route: '/databases',
    sql: {
      image: require('./assets/sql.png'),
      name: 'SQL',
      route: '/sql'
    },
    nosql: {
      image: require('./assets/nosql.png'),
      name: 'NoSQL',
      route: '/nosql',
      sub: {
        mongodb: {
          image: require('./assets/mongodb.png'),
          name: 'MongoDB',
          route: '/nosql/mongodb'
        },
        dynamodb: {
          image: require('./assets/dynamodb.png'),
          name: 'DynamoDB',
          route: '/nosql/dynamodb'
        }
      }
    }
  },
  ai: {
    image: require('./assets/ai.png'),
    name: 'Artificial Intelligence',
    route: '/ai'
  },
  languages: {
    image: require('./assets/languages.png'),
    name: 'Languages',
    route: '/languages',
    sub: {
      javascript: {
        image: require('./assets/javascript.png'),
        name: 'JavaScript',
        route: '/languages/javascript'
      },
      c: {
        image: require('./assets/c.png'),
        name: 'C',
        route: '/languages/c'
      },
      java: {
        image: require('./assets/java.png'),
        name: 'Java',
        route: '/languages/java'
      }
    }
  }
};

export {
  color,
  font,
  xy,
  b,
  row,
  f1,
  routes
};
