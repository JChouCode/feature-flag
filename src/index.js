import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import * as serviceWorker from './serviceWorker';
import client from './apollo';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


ReactDOM.render(
  <ApolloProvider client={client} >
    <App />
  </ApolloProvider >,
  document.getElementById('root')
);

serviceWorker.unregister();