interface Action { // events
  type: string;
  // [key: string]: any;
  payload: any;
}

const action2: Action = {
  type: '[DashboardPage] FetchProjectsSuccess',
  payload: [
    { id: 123, name: 'some project' }
  ]
}


// FSA = Flux Standard Action

class Store {
  dispatch(action: Action) { /*...*/ }
  subscribe(listenerFn: () => void) { /*...*/ }
  getState(): any { /*...*/ }
}


// =======
// in app:
const store = new Store();

// design state shape
// global app state
const state = {

  // e-commerce example
  // user: {},
  // catalog: {},
  // cart: {},
  // account: {},
  // ordersHistory: {},
  // admin: {},


  counter: { // state slice
    value: 997,
  },

  users: { // users state slice
    entities: [],
    count: 123
  },

  todos: [] //state slice
};



// actions
const action = {
  type: '[DashboardPage] UserFetchRequest',
  payload: {
    userid: 123
  }
}; // "event"

store.dispatch(action);





// reducer(s)
function usersReducer(stateSlice = {}, action) {
  switch (action.type) {
    case '[DashboardPage] LoadUsersRequest': {
      const nextState = { ...state };
      return nextState;
    }
    case '[Source2] Event2': {
      const nextState2 = { ...state };
      return nextState2;
    }
    default: {
      return state;
    }
  }

  const nextState = {
    ...stateSlice,
  };
  return nextState;
}

function counterReducer(stateSlice, action) {
  const nextState = {};
  return nextState;
}


function rootReducer(state, action) {
  const nextCounterState = counterReducer(state.counter, action);
  const nextUsersState = usersReducer(state.users, action);

  const nextAppState = {
    ...state,
    users: nextUsersState,
    counter: nextCounterState,
  };
  return nextAppState;
}



// client code - Components

// Counter component
store.subscribe(() => {
  const state = store.getState();
  //do smth modufy local cmp state
});

// // Todos component
store.subscribe(() => {
  const state = store.getState();
  //do smth
});
