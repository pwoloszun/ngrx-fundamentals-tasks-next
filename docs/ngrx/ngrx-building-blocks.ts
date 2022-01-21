interface Action {
  type: string;
  // payload: any;
}

class Store {
  dispatch(action: Action) { /*...*/ }
  subscribe(listenerFn: () => void) { /*...*/ }
  getState(): any { /*...*/ }
}


// =======
// in app:
const store = new Store();


// global app state
const state = {
  counter: { // state slice
    value: 997
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
function usersReducer(state, action) {
  const nextState = {};
  return nextState;
}

function counterReducer(state, action) {
  const nextState = {};
  return nextState;
}


function rootReducer(state, action) {
  const nextUsersState = usersReducer(state.users, action);
  const nextCounterState = counterReducer(state.counter, action);

  return {
    ...state,
    users: nextUsersState,
    counter: nextCounterState,
  };
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
