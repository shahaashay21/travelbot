import React, { Component } from 'react';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import RouterComponent from './src/RouterComponent';
import reducers from './src/Reducers';

class App extends Component {
  render(){
      const store= createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <RouterComponent/>
      </Provider>
    );
  }
}


export default App;